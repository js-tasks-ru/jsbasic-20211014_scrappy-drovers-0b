function camelize(str) {
  const parts = str.split("-");
  const filteredUpperCaseParts = parts
    .map((part, i) => {
      if (i > 0) {
        return part[0].toUpperCase() + part.slice(1);
      }
      return part;
    })
    .filter((part) => part);
  return filteredUpperCaseParts.join("");
}
