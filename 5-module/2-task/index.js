function toggleText() {
  const button = document.querySelector(".toggle-text-button");
  let text = document.getElementById("text");
  function hideText() {
    text.hidden = true;
  }

  function showText() {
    text.hidden = false;
  }

  button.onclick = function () {
    if (text.hidden) {
      showText();
    } else {
      hideText();
    }
  };
}
