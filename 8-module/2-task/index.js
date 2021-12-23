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
        properties.forEach((property) => {
          let value = this.filters[property];
          if (property === "noNuts") {
            if (value) {
              match.push(value === (!product.nuts ?? true));
            } else {
              match.push(true);
            }
          }
          if (property === "vegeterianOnly") {
            if (value) {
              match.push(
                value === (product.vegeterian ?? false)
              );
            } else {
              match.push(true);
            }
          }
          if (property === "maxSpiciness") {
            match.push(value >= (product.spiciness ?? 0));
          }
          if (property === "category") {
            match.push(
              value === product.category ||
                (value ?? "") === ""
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
