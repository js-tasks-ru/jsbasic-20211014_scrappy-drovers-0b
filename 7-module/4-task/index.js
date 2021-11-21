export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    let sliderRootElement = this.elem.getRootNode();
    sliderRootElement.addEventListener("click", (e) => {
      this.onClick(e);
    });
    sliderRootElement.addEventListener("pointerdown", (e) => {
      this.onPointerDown(e);
    });
    sliderRootElement.addEventListener("pointermove", (e) => {
      sliderRootElement.classList.add("slider_dragging");
      this.onPointerMove(e);
    });
    sliderRootElement.addEventListener("pointerup", () => {
      this.onPointerUp();
      sliderRootElement.classList.remove("slider_dragging");
    });
    sliderRootElement.ondragstart = () => false;
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("slider");
    let spans = [...Array(this.steps).keys()].map((step, index) => {
      if (index === 0) {
        return `<span class="slider__step-active"></span>`;
      }
      return `<span></span>`;
    });
    this.elem.innerHTML = `
    <div class="slider__thumb" style="left: 25%;">
    <span class="slider__value">1</span>
    </div>
    <div class="slider__progress" style="width: 25%;"></div>
    <div class="slider__steps">
      ${spans.join("")}
    </div>
  `;
  }

  onPointerDown = (event) => {
    event.preventDefault();
  };

  onClick = (event) => {
    let leftRelative = this.getleftRelative(event, this.elem);
    this.value = this.calculatePosition(leftRelative);
    let valuePercents = this.calculatePercentage(this.value);
    this.paint(this.value, valuePercents);
  };

  onPointerMove = (event) => {
    let leftRelative = this.getleftRelative(event, this.elem);

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    this.value = this.calculatePosition(leftRelative);
    this.paint(this.value, leftPercents);
  };

  onPointerUp = () => {
    this.elem.removeEventListener("pointerup", this.onPointerUp);
    this.elem.removeEventListener("pointermove", this.onPointerMove);
    this.generateEvent(this.value);
  };

  calculatePosition = (leftRelative) => {
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    return Math.round(approximateValue);
  };

  calculatePercentage = (value) => {
    return (value / (this.steps - 1)) * 100;
  };

  paint = (value, valuePercents) => {
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    this.changeActive(value);
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  };

  changeActive = (value) => {
    let sliderValue = this.elem.querySelector(".slider__value");
    let spanElements = this.elem.querySelector(".slider__steps").children;
    sliderValue.innerHTML = value;
    Array.from(spanElements).forEach((span) =>
      span.classList.remove("slider__step-active")
    );
    spanElements[value].classList.add("slider__step-active");
    this.generateEvent(value);
  };

  generateEvent = (value) => {
    let sliderChange = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true,
    });
    this.elem.dispatchEvent(sliderChange);
  };

  getleftRelative = (event, elem) =>
    (event.clientX - elem.getBoundingClientRect().left) / elem.offsetWidth;
}
