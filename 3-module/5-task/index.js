function getMinMax(str) {
  const numbers = str.split(' ').filter((num) => Number(num));
  return { ['min']: Math.min(...numbers), ['max']: Math.max(...numbers) };
}
