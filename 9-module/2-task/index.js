import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    this.rootCarouselElement = document.querySelector("[data-carousel-holder]");
    this.rootRibonElement = document.querySelector("[data-ribbon-holder]");
    this.rootSliderElement = document.querySelector("[data-slider-holder]");
    this.rootCartIconElement = document.querySelector("[data-cart-icon-holder]");
    this.noNutsCheckbox = document.getElementById("nuts-checkbox");
    this.vegeterianCheckbox = document.getElementById("vegeterian-checkbox");
    this.rootProductsGridElement = document.querySelector(
      "[data-products-grid-holder]"
    );

    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    this.filters = {
      noNuts: this.noNutsCheckbox.checked,
      vegeterianOnly: this.vegeterianCheckbox.checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    };

    this.rootCarouselElement.append(this.carousel.elem);
    this.rootRibonElement.append(this.ribbonMenu.elem);
    this.rootSliderElement.append(this.stepSlider.elem);
    this.rootCartIconElement.append(this.cartIcon.elem);

    return await fetch("./products.json")
      .then((response) => this.showProducts(response.json()))
      .catch((error) => console.log(error));
  }

  async showProducts(products) {
    this.products = await products;
    this.productsGrid = new ProductsGrid(this.products);
    this.rootProductsGridElement.innerHTML = "";
    this.rootProductsGridElement.append(this.productsGrid.elem);
    this.productsGrid.updateFilter(this.filters);
    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener(
      "product-add",
      function (event) {
        let [product] = this.products.filter(({ id }) => id === event.detail);
        this.cart.addProduct(product);
      }.bind(this)
    );

    this.rootSliderElement.addEventListener(
      "slider-change",
      function (event) {
        this.filters = { ...this.filters, maxSpiciness: event.detail };
        this.productsGrid.updateFilter(this.filters);
      }.bind(this)
    );

    this.rootRibonElement.addEventListener(
      "ribbon-select",
      function (event) {
        this.filters = { ...this.filters, category: event.detail };
        this.productsGrid.updateFilter(this.filters);
      }.bind(this)
    );

    this.noNutsCheckbox.addEventListener("change", (event) => {
      this.filters = { ...this.filters, noNuts: event.currentTarget.checked };
      this.productsGrid.updateFilter(this.filters);
    });

    this.vegeterianCheckbox.addEventListener("change", (event) => {
      this.filters = {
        ...this.filters,
        vegeterianOnly: event.currentTarget.checked,
      };
      this.productsGrid.updateFilter(this.filters);
    });
  }
}
