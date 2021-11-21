import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
    this.setTitle();
    this.setBody();
    this.open();

    this.listener = (event) => {
      if (event.code === "Escape") {
        this.close();
      }
    };
    document.addEventListener("keydown", this.listener);
  }

  render() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>
      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>
    `;
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add("is-modal-open");
    let closeButton = this.modal.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.onClick();
    });
  }

  setTitle(title) {
    let currentTitle = this.modal.querySelector(".modal__title");
    currentTitle.innerHTML = title;
  }

  setBody(node) {
    let content = this.modal.querySelector(".modal__body");
    content.innerHTML = "";
    content.append(node);
  }

  close() {
    document.body.innerHTML = "";
    document.body.classList.remove("is-modal-open");
    this.removeListener();
  }

  onClick() {
    this.close();
  }

  removeListener() {
    if (!document.body.classList.contains("is-modal-open")) {
      document.removeEventListener("keydown", this.listener);
    }
  }
}
