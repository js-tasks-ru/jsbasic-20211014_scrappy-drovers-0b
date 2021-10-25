function namify(users) {
  let names = [];
  for ({ name, _ } of users) {
    names = [...names, name];
  }
  return names;
}
