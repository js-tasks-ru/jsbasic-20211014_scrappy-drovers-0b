export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
