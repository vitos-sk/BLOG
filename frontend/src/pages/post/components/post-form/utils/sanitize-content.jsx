export const sanitizeContent = (input = "") => {
    // декодируем &lt; &gt; &amp; &nbsp;
    const ta = document.createElement("textarea");
    ta.innerHTML = input;
    const decoded = ta.value;

    // заменяем базовые блочные теги на переносы
    const html = decoded
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/div>\s*<div[^>]*>/gi, "\n\n")
        .replace(/<div[^>]*>/gi, "")
        .replace(/<\/div>/gi, "\n")
        .replace(/<p[^>]*>/gi, "")
        .replace(/<\/p>/gi, "\n");

    // выдёргиваем видимый текст
    const wrap = document.createElement("div");
    wrap.innerHTML = html;
    let text = wrap.innerText;

    // нормализация: одна пустая строка между абзацами
    return text
        .replace(/\u00A0/g, " ") // NBSP → обычный пробел
        .replace(/[ \t]+/g, " ") // сжать пробелы, НЕ трогая \n
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
};
