function makeFriendsList(friends) {
  let ul = document.createElement("ul");
  let result = [];

  for (const { firstName, lastName } of friends) {
    let li = document.createElement("li");
    li.innerHTML = `${firstName} ${lastName}`;
    result.push(li);
  }
  ul.append(...result);
  return ul;
}
