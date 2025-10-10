export const formatCount = (value, k = 1000) => {
  if (value < k) return String(value);
  const formatted = (value / k).toFixed(1);
  return formatted.endsWith('.0')
    ? `${formatted.slice(0, -2)}k`
    : `${formatted}k`;
};
