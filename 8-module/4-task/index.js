import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let cartItem = this.cartItems.filter(
        (item) => item.product.id === product.id
      )[0];
      let count = 1;
      if (cartItem) {
        cartItem.count += count;
      } else {
        cartItem = { product, count };
        this.cartItems = [...this.cartItems, cartItem];
      }
      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.filter(
      (item) => item.product.id === productId
    )[0];
    if (cartItem) {
      cartItem.count += amount;
      if (cartItem.count === 0) {
        this.cartItems = this.cartItems.filter(
          (item) => item.product.id !== productId
        );
      }
      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    console.log(this.cartItems.length);
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce(function (sum, cartItem) {
      return sum + cartItem.count;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(function (sum, cartItem) {
      return sum + cartItem.count * cartItem.product.price;
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    let products = this.cartItems.map((item) =>
      this.renderProduct(item.product, item.count)
    );

    let rootElem = createElement(`<div></div>`);
    products.forEach((product) => {
      rootElem.appendChild(product);
    });
    rootElem.appendChild(this.renderOrderForm());

    this.modal.setBody(rootElem);

    let minusButtons = document.querySelectorAll(".cart-counter__button_minus");
    let plusButtons = document.querySelectorAll(".cart-counter__button_plus");

    minusButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        let productId = e.target.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, -1);
      });
    });

    plusButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        let productId = e.target.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, 1);
      });
    });

    let form = document.querySelector(".cart-form");
    form.addEventListener("submit", (e) => this.onSubmit(e));
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains("is-modal-open")) {
      if (this.isEmpty()) {
        this.modal.close();
      } else if (cartItem.count === 0) {
        let productCard = document.body.querySelector(
          `[data-product-id="${cartItem.product.id}"]`
        );
        productCard.style.display = "none";
      } else {
        let productCount = document.body.querySelector(
          `[data-product-id="${cartItem.product.id}"] .cart-counter__count`
        );
        let productPrice = document.body.querySelector(
          `[data-product-id="${cartItem.product.id}"] .cart-product__price`
        );
        let infoPrice = document.body.querySelector(
          `.cart-buttons__info-price`
        );

        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(
          cartItem.count * cartItem.product.price
        ).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let formElem = document.querySelector(".cart-form");
    let submitElement = document.querySelector('button[type="submit"]');
    submitElement.classList.add("is-loading");
    const submit = async () => {
      let response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: new FormData(formElem),
      });
      if (response.ok) {
        this.modal.setTitle("Success!");
        this.cartItems = [];
        this.modal.setBody(
          createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`)
        );
      }
    };
    submit();
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
