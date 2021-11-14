import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.addCustomEvent();
    this.initCarousel();
  }

  render() {
    let composedSlides = this.slides.map((slide) => {
      return `<div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${
  slide.image
}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
    });

    this.elem = createElement(`<div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
    ${composedSlides.join("")}
      </div>
      </div>`);
  }

  addCustomEvent() {
    let slideElements = this.elem.querySelectorAll(".carousel__slide");
    slideElements.forEach((element) => {
      let button = element.querySelector(".carousel__button");
      button.onclick = function () {
        button.dispatchEvent(
          new CustomEvent("product-add", {
            detail: element.dataset.id,
            bubbles: true,
          })
        );
      };
    });
  }

  initCarousel() {
    let slidesContainer = this.elem.querySelector(".carousel__inner");
    let numberOfSlides = slidesContainer.children.length;
    let buttonRight = this.elem.querySelector(".carousel__arrow_right");
    let buttonLeft = this.elem.querySelector(".carousel__arrow_left");
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
      slidesContainer.style.transform = `translateX(${(currentWidth -=
        slidesContainer.offsetWidth)}px)`;
    };
    buttonLeft.onclick = function () {
      slidesCounter -= 1;
      if (slidesCounter === 1) {
        buttonLeft.style.display = "none";
        buttonRight.style.display = "";
      }
      slidesContainer.style.transform = `translateX(${(currentWidth +=
        slidesContainer.offsetWidth)}px)`;
    };
  }
}
