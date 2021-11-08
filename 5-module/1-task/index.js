function hideSelf() {
  const hideButton = document.querySelector(".hide-self-button");
  hideButton.onclick = function (event) {
    event.currentTarget.hidden = true;
  };
}
