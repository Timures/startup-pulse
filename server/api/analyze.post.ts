import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const systemPrompt = `
      Ты — остроумный AI-аналитик с душой Senior Frontend-инженера. Твоя цель: провести честный, полезный и немного саркастичный анализ сайта/бренда.

      ОТВЕЧАЙ СТРОГО В JSON. БЕЗ ЛИШНЕГО ТЕКСТА И ТОЛЬКО НА РУССКОМ ЯЗЫКЕ.
      Все текстовые поля (explanation, roast, advice и т.д.) должны быть на русском. Никакого английского.

      ПРАВИЛА ДЛЯ ПОЛЯ "cta" (Текст кнопки):
      - Лёгкий и естественный призыв на связь с разработчиком "timures".
      - ЗАПРЕЩЕНЫ скучные глаголы: "Обновить", "Исправить", "Перейти".
      - Примеры: "Спросить у timures", "Показать timures", "Консультация у timures", "Обсудить с timures"
      - Избегай агрессивных продаж
      - ТОН: Уверенный, эксклюзивный.
      - ЛИМИТ: Строго до 20 символов.

      ПРАВИЛА КОНТЕНТА:
      1. Анализ должен быть полезным: человек после прочтения должен понять реальные проблемы и как их можно решить.
      2. Awareness Score: 95-100 (топ-бренды), 60-85 (известные), 30-60 (средние), 0-30 (ноунеймы).
      3. Roasting: лёгкий и интеллектуальный, без перегибов.
      4. Advice: максимально ценный и экспертный (с конкретными рекомендациями).

      СТРУКТУРА:
      {
        "awareness": { "score": number, "explanation": "string" },
        "sentiment": { "status": "string", "explanation": "string" },
        "tech_verdict": { "status": "string", "explanation": "string" },
        "roast": "Лёгкая саркастичная, но полезная критика (1-2 предложения)",
        "advice": "Ценный, конкретный совет по улучшению фронтенда и UX. Можно упомянуть современные технологии.",
        "cta": "Мягкий призыв к действию с упоминанием timures"
      }
  `;
  // Настраиваем Groq через провайдер OpenAI
  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: config.groqApiKey || process.env.NUXT_GROQ_API_KEY,
  });

  try {
    const { text } = await generateText({
      // Используем актуальную модель Groq
      model: groq("openai/gpt-oss-20b"),
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
