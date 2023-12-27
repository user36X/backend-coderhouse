const { ProductManager } = require('./models/ProductManager');

try {
  const manager = new ProductManager();
  console.log('Productos:');
  console.log(manager.getProducts());

  manager.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25,
  );
  console.log('\n----------------------------');
  console.log('|  se agrego un producto!  |');
  console.log('----------------------------\n');

  console.log('Productos:');
  console.log(manager.getProducts());
  console.log();

  const idBuscar = manager.getProducts()[0].id;
  console.log(`\nBuscando producto con id > ${idBuscar}`);
  const encontrado = manager.getProductById(idBuscar);
  console.log(encontrado);

  console.log();
  console.log('Agregando otro producto ...');
  manager.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25,
  );
} catch (err) {
  console.log(`ERROR: ${err.message}`);
}
