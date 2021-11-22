import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    let buttonLeft = this.elem.querySelector(".ribbon__arrow_left");
    let buttonRight = this.elem.querySelector(".ribbon__arrow_right");
    let ribbonInner = this.elem.querySelector(".ribbon__inner");
    buttonLeft.classList.remove("ribbon__arrow_visible");
    buttonRight.classList.add("ribbon__arrow_visible");
    buttonRight.onclick = function () {
      ribbonInner.scrollBy(350, 0);
    };
    buttonLeft.onclick = function () {
      ribbonInner.scrollBy(-350, 0);
    };
    ribbonInner.addEventListener("scroll", (event) => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollLeft === 0) {
        buttonLeft.classList.remove("ribbon__arrow_visible");
        buttonRight.classList.add("ribbon__arrow_visible");
      }
      if (scrollRight < 1) {
        buttonRight.classList.remove("ribbon__arrow_visible");
        buttonLeft.classList.add("ribbon__arrow_visible");
      }
    });
    this.addCustomEvent();
  }
  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("ribbon");

    let composedCategories = this.categories.map((category, index) => {
      if (index === 0 || index === this.categories.length - 1) {
        return `<a href="#" class="ribbon__item ribbon__item_active" data-id="${category.id}">${category.name}</a>`;
      }
      return `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
    });

    this.elem.innerHTML = `
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
      ${composedCategories.join("")}
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    `;
  }

  onclick = (event) => {
    event.preventDefault();
    let activeLinks = this.elem.querySelectorAll(".ribbon__item_active");
    activeLinks.forEach((link) => link.classList.remove("ribbon__item_active"));
    event.target.classList.add("ribbon__item_active");
    let customEvent = new CustomEvent("ribbon-select", {
      detail: event.target.dataset.id,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  };

  addCustomEvent() {
    let categoryLinks = this.elem.querySelectorAll(".ribbon__item");
    categoryLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        this.onclick(event);
      });
    });
  }
}
