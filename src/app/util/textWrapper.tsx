export function wrapText(text: string, maxCharsPerLine = 8): string {
  const words = text.split(' ');
  let line = '';
  let result = '';

  for (const word of words) {
    if ((line + word).length > maxCharsPerLine) {
      result += line.trim() + '\n';
      line = word + ' ';
    } else {
      line += word + ' ';
    }
  }

  return result + line.trim();
}
