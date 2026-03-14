export function cleanHtml(html: string) {
  if (!html) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // remove empty tags
  const elements = doc.body.querySelectorAll("*");

  elements.forEach((el) => {
    if (
      el.textContent?.trim() === "" &&
      el.children.length === 0 &&
      el.tagName !== "BR"
    ) {
      el.remove();
    }
  });

  return doc.body.innerHTML;
}