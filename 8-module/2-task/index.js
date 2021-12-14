import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("products-grid");
    this.elem.innerHTML = `
    <div class="products-grid__inner">
    </div>
    `;
    this.updateFilter(this.filters);
  }

  updateFilter(filters) {
    this.filters = { ...this.filters, ...filters };
    this.filteredProducts = this.products;
    if (
      Object.keys(this.filters).length === 0 &&
      this.filters.constructor === Object
    ) {
      this.showProducts(this.filteredProducts);
    } else {
      this.filteredProducts = this.filteredProducts.filter((product) => {
        let match = [];
        let properties = Object.keys(this.filters);
        properties.forEach((k) => {
          if (k === "noNuts") {
            match.push(this.filters[k] === !(product.nuts || false));
          }
          if (k === "vegeterianOnly") {
            match.push(this.filters[k] === (product.vegeterian || false));
          }
          if (k === "maxSpiciness") {
            match.push(this.filters[k] >= (product.spiciness || 0));
          }
          if (k === "category") {
            match.push(
              this.filters[k] === product.category || this.filters[k] === ""
            );
          }
        });
        return match.length === properties.length && !match.includes(false);
      });
      this.showProducts(this.filteredProducts);
    }
  }

  showProducts(products) {
    let grid = this.elem.querySelector(".products-grid__inner");
    let composeProducts = products.map((product) => {
      let card = new ProductCard(product);
      return card.elem;
    });
    grid.replaceChildren(...composeProducts);
  }
}
