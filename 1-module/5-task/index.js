function truncate(str, maxlength) {
  let ellipsis = "…";
  return (str.length > maxlength) ? str.slice(0, maxlength - 1) + ellipsis : str;
}
