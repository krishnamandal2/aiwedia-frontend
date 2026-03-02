/**
 * Convert plain-text from BlogEditor to backend content[]
 */
export const textToContentArray = (text: string) => {
  const blocks = text
    .split(/\n\s*\n/) // double line break → paragraph block
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((b) => ({
    text: b,
  }));
};
