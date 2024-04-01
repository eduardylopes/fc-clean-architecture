import Product from '../../../domain/product/entity/product';
import { app, sequelize } from '../express';
import request from 'supertest';
import ProductRepository from '../../product/repository/sequelize/product.repository';

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should list all products', async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product('product_1', 'Product 1', 10);
    await productRepository.create(product1);

    const product2 = new Product('product_2', 'Product 2', 20);
    await productRepository.create(product2);

    const listResponse = await request(app).get('/product').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    expect(listResponse.body.products[0].id).toBe('product_1');
    expect(listResponse.body.products[0].name).toBe('Product 1');
    expect(listResponse.body.products[0].price).toBe(10);

    expect(listResponse.body.products[1].id).toBe('product_2');
    expect(listResponse.body.products[1].name).toBe('Product 2');
    expect(listResponse.body.products[1].price).toBe(20);

    const listResponseXML = await request(app)
      .get('/product')
      .set('Accept', 'application/xml')
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);

    expect(listResponseXML.text).toContain(`<id>product_1</id>`);
    expect(listResponseXML.text).toContain(`<name>Product 1</name>`);
    expect(listResponseXML.text).toContain(`<price>10</price>`);

    expect(listResponseXML.text).toContain(`<id>product_2</id>`);
    expect(listResponseXML.text).toContain(`<name>Product 2</name>`);
    expect(listResponseXML.text).toContain(`<price>20</price>`);

    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
