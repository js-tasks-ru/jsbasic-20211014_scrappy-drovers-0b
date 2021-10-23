function sumSalary(salaries) {
  let salary = 0;
  for (const [key, value] of Object.entries(salaries)) {
    if (Number.isInteger(value)) {
      salary += value;
    }
  }
  return salary;
}
