function showSalary(users, age) {
  const maxAge = age;
  return users
    .filter((user) => user.age <= maxAge)
    .reduce(
      (current, { balance, name }) => (current += `${name}, ${balance}\n`),
      ''
    )
    .trim();
}
