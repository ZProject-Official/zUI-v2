const isColor = (str: string): boolean => {
  if (!str) return false;

  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(str)) return true;

  if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/.test(str)) return true;

  if (/^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)$/.test(str)) return true;

  const s = new Option().style;
  s.color = str;
  return s.color !== '';
};

export default isColor;
