export function getPlainText(html: string) {
    return html
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
}