function filterRange(arr, a, b) {
  const rangeArray = Array(b - a + 1)
    .fill()
    .map((_, i) => a + i);
  return arr.filter((el) => rangeArray.includes(el));
}
