const path = require('path');
const colors = require('colors');
const { ProductManager } = require('./models/ProductManager');

(async function () {
  try {
    console.log(
      'Se creará una instancia de la clase "ProductManager"'.underline,
    );
    const manager = new ProductManager(path.join(__dirname, './db/data.json'));
    console.log(manager);
    console.log();

    console.log(
      'Se llamará “getProducts” recién creada la instancia'.underline,
    );
    console.log(await manager.getProducts());
    console.log();

    console.log('Se llamará al método "addProduct"'.underline);
    const last = await manager.addProduct(
      'producto prueba',
      'Este es un producto prueba',
      200,
      'Sin imagen',
      'abc123',
      25,
    );
    console.log(last);
    console.log();

    console.log(
      'Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado'
        .underline,
    );
    console.log(await manager.getProducts());
    console.log();

    console.log(
      'Se llamará al método "getProductById" y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error',
    );
    console.log(await manager.getProductById(last.id));
    console.log();

    console.log(
      'Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.',
    );
    console.log(
      await manager.updateProduct(
        last.id,
        'stock',
        Math.floor(Math.random() * (1000 - 100) + 100),
      ),
    );
    console.log();

    console.log(
      'Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.',
    );
    console.log(
      `Cantidad de Productos antes del delete: ${
        (await manager.getProducts()).length
      }`,
    );
    const deleted = await manager.deleteProduct(last.id);
    console.log(
      `Cantidad de Productos después del delete: ${
        (await manager.getProducts()).length
      }`,
    );
    console.log('Eliminado:');
    console.log(deleted);
    console.log();
  } catch (err) {
    console.error(`An error ocurred: ${err.message}`.white.bgRed);
  }
})();
