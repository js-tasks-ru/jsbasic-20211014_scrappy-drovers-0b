function initCarousel() {
  const buttonRight = document.querySelector(".carousel__arrow_right");
  const buttonLeft = document.querySelector(".carousel__arrow_left");
  const slidesContainer = document.querySelector(".carousel__inner");
  let numberOfSlides = document.querySelectorAll(".carousel__slide").length;
  let slideWidth = slidesContainer.offsetWidth;
  let currentWidth = 0;
  let slidesCounter = 1;
  if (slidesCounter === 1) {
    buttonLeft.style.display = "none";
  }
  buttonRight.onclick = function () {
    buttonLeft.style.display = "";
    slidesCounter += 1;
    if (slidesCounter === numberOfSlides) {
      buttonRight.style.display = "none";
    }
    slidesContainer.style.transform = `translateX(${currentWidth -= slideWidth}px)`;
  };
  buttonLeft.onclick = function () {
    slidesCounter -= 1;
    if (slidesCounter === 1) {
      buttonLeft.style.display = "none";
      buttonRight.style.display = "";
    }
    slidesContainer.style.transform = `translateX(${currentWidth += slideWidth}px)`;
  };
}
