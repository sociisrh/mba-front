export function currencyBrToNumber(string) {
  return Number(
    string
      .replace(/[^0-9,-]+/g, "")
      .replace(",", ".")
      .trim()
  );
}
