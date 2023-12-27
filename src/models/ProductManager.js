const path = require('path');
const fs = require('fs').promises;
const colors = require('colors');
const { Product } = require('./Product');

class ProductManager {
  #filePath;
  #products;

  constructor(filePath) {
    this.#filePath = filePath
      ? filePath
      : path.join(__dirname, './../db/data.json');
    this.#products = [];
  }

  async loadData() {
    try {
      const data = await fs.readFile(this.#filePath, 'utf-8');
      this.#products = data === '' ? [] : JSON.parse(data).products;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async saveData() {
    try {
      const string = JSON.stringify({ products: this.#products }, null, '\t');
      await fs.writeFile(this.#filePath, string, 'utf-8');
    } catch (err) {
      console.log(`An error ocurred: ${err.message}`.white.bgRed);
      throw new Error(err.message);
    }
  }

  async getProducts() {
    try {
      await this.loadData();
      return this.#products;
    } catch (err) {
      console.log(`An error ocurred: ${err.message}`.white.bgRed);
      throw new Error(err.message);
    }
  }

  async getProductById(id) {
    try {
      await this.loadData();
      let result = this.#products.find((product) => product.id === id);
      if (result) return result;
      throw new Error('Not found');
    } catch (err) {
      console.log(`An error ocurred: ${err.message}`.white.bgRed);
      throw new Error(err.message);
    }
  }

  async getProductByCode(code) {
    try {
      await this.loadData();
      let result = this.#products.find((product) => product.code === code);
      return result;
    } catch (err) {
      console.log(`An error ocurred: ${err.message}`.white.bgRed);
      throw new Error(err.message);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error('All parameters are required');
    }
    try {
      let dummy = await this.getProductByCode(code);
      if (dummy) throw new Error('Product already exists');
      let newOne = new Product(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      );
      this.#products.push(newOne);
      await this.saveData();
      return newOne;
    } catch (err) {
      console.log(`An error ocurred: ${err.message}`.white.bgRed);
      throw new Error(err.message);
    }
  }

  async updateProduct(id, field, value) {
    try {
      await this.loadData();
      const product = await this.getProductById(id);
      product[field] = value;
      await this.saveData();
      return product;
    } catch (err) {
      console.log(`An error ocurred: ${err.message}`.white.bgRed);
      throw new Error(err.message);
    }
  }

  async deleteProduct(id) {
    try {
      await this.loadData();
      let index = null;
      for (let i = 0; i < this.#products.length; i++) {
        let current = this.#products[i];
        if (current.id === id) {
          index = i;
          break;
        }
      }
      if (index !== null) {
        const deleted = this.#products.splice(index, 1);
        await this.saveData();
        return deleted;
      }
      throw new Error('Id does not match with any product registered.');
    } catch (err) {
      console.log(`An error ocurred: ${err.message}`.white.bgRed);
      throw new Error(err.message);
    }
  }
}

module.exports = { ProductManager };
