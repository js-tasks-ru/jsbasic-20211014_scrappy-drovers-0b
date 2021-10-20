function factorial(n) {
  let result = 1;
  let i = 0;
  while (n > i) {
    result *= n - i;
    i++;
  }
  return result;
}
