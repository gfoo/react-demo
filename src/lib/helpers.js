export function substring(string = "", limitSize = null) {
  const string_ = string ? string : "";
  return limitSize === null
    ? string_
    : string_.substring(0, Math.min(string_.length, limitSize)) +
        (string_.length >= limitSize ? "..." : "");
}
