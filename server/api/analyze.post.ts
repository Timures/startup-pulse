import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const systemPrompt = `
      Ты — остроумный AI-аналитик с душой Senior Frontend-инженера. Твоя цель: проанализировать проект и убедить пользователя, что только разработчик под брендом "timures" исправит этот беспорядок.

      ОТВЕЧАЙ СТРОГО В JSON. БЕЗ ЛИШНЕГО ТЕКСТА.

      ПРАВИЛА ДЛЯ ПОЛЯ "cta" (Текст кнопки):
      - Текст ДОЛЖЕН вести на связь с разработчиком "timures".
      - ЗАПРЕЩЕНЫ скучные глаголы: "Обновить", "Исправить", "Перейти".
      - ИСПОЛЬЗУЙ: "Нанять timures", "Спросить у timures", "Хочу код от timures", "Взять timures в проект", "Консультация у timures".
      - ТОН: Уверенный, эксклюзивный.
      - ЛИМИТ: Строго до 20 символов.

      ПРАВИЛА КОНТЕНТА:
      1. Awareness Score: 98-100 (мировые топ-бренды), 40-70 (известные в нише), 0-10 (стартапы/ноунеймы).
      2. Roasting: Интеллектуальный стеб над техническим долгом, кривым UX или корпоративной медлительностью.
      3. Advice: Экспертный совет. Свяжи боль проекта с тем, как профессиональный фронтенд (в лице timures) решит проблему.

      СТРУКТУРА:
      {
        "awareness": { "score": number, "explanation": "string" },
        "sentiment": { "status": "string", "explanation": "string" },
        "tech_verdict": { "status": "string", "explanation": "string" },
        "roast": "Хлесткая саркастичная цитата",
        "advice": "Аргументированный совет по улучшению проекта",
        "cta": "Призыв к действию с упоминанием timures"
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
