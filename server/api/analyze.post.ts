import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const systemPrompt = `
    Ты — остроумный, но профессиональный AI-аналитик. Твоя цель: оценить компанию и предложить услуги разработчика (автора сайта).
    Твоя задача — генерировать данные в формате JSON.ЗАПРЕЩЕНО писать вводные фразы вроде "Вот ваш анализ" или "Стартап с названием...".
    ВАЖНО: Поле "advice" должно органично связывать проблему проекта с услугами Vue разработчика, если требуется.

    ПРАВИЛА ОЦЕНКИ:
    1. Awareness Score:
       - Если это мировой гигант (Google, Microsoft, Apple, Stripe) — ставь 98-100.
       - Если это локально известный проект — 40-70.
       - Если это ноунейм — 0-10.
    2. Тон юмора:
       - Используй "интеллектуальный роаст". Избегай фраз про "закрытие бизнеса" или "банкротство".
       - Вместо грубости шути над бюрократией корпораций или типичными ошибками стартаперов (бесконечные редизайны, поиск Product-Market Fit).

    СТРУКТУРА ОТВЕТА (JSON):
    {
      "awareness": { "score": number, "explanation": "Краткое описание медийности" },
      "sentiment": { "status": "string", "explanation": "Анализ восприятия аудиторией" },
      "tech_verdict": { "status": "string", "explanation": "Рекомендация по фронтенду" },
      "roast": "Одна остроумная фраза без прямой грубости",
      "advice": "персонализированный совет, почему им нужен именно Vue разработчик (автор сайта)"
    }
  `;

  // Настраиваем Groq через провайдер OpenAI
  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: config.groqApiKey || process.env.GROQ_API_KEY,
  });

  try {
    const { text } = await generateText({
      // Используем актуальную модель Groq
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      prompt: `Верни JSON для проекта: ${body.name}. Не пиши ничего, кроме JSON.`,
      // Для Groq лучше использовать простой JSON режим
      responseFormat: { type: "json_object" },
    });

    // Обрабатываем ответ
    if (!text) throw new Error("Empty response from AI");

    // Ищем JSON в тексте, если модель добавила лишние слова
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const rawJson = jsonMatch ? jsonMatch[0] : text;

    return JSON.parse(rawJson);
  } catch (error: any) {
    // Выводим реальную ошибку в консоль сервера для отладки
    console.error("Raw AI text that failed:", error); // Увидишь в терминале, что именно прислал AI

    throw createError({
      statusCode: 500,
      statusMessage:
        "AI увлекся описанием и забыл про формат. Попробуйте еще раз.",
    });
  }
});
