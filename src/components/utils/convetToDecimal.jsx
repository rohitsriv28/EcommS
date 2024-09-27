export function formatNumber(num) {
  if (num % 1 === 0) {
    return num.toFixed(2);
  } else {
    return num.toString();
  }
}
