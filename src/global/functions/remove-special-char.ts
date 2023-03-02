// remove special characters from string
export function removeSpecialChar(str: string): string {
  return str.replace(/[^\w\s]/gi, '');
}