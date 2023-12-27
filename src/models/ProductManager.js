const { Product } = require('./Product');

class ProductManager {
  #products;

  constructor() {
    this.#products = [];
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    let result = this.#products.find((product) => product.id === id);
    if (result) return result;
    throw new Error('Not found');
  }

  getProductByCode(code) {
    let result = this.#products.find((product) => product.code === code);
    return result;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error('All parameters are required');
    }
    let dummy = this.getProductByCode(code);
    if (dummy) throw new Error('Product already exists');
    let newOne = new Product(title, description, price, thumbnail, code, stock);
    this.#products.push(newOne);
    return newOne;
  }
}

module.exports = { ProductManager };
