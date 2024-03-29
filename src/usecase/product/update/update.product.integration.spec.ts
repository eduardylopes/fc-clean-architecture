import { Sequelize } from 'sequelize-typescript';
import ProductFactory from '../../../domain/product/factory/product.factory';
import UpdateProductUseCase from './update.product.usecase';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import Product from '../../../domain/product/entity/product';
import { v4 as uuid } from 'uuid';

describe('Integration test for update product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it('should update a product', async () => {
    const repository = new ProductRepository();
    const useCase = new UpdateProductUseCase(repository);

    const product = new Product(uuid(), 'Product Name', 20.9);
    await repository.create(product);

    const input = {
      id: product.id,
      name: 'Product New Name',
      price: 10,
    };

    const output = await useCase.execute(input);

    expect(output.id).toEqual(product.id);
    expect(output.name).toEqual(input.name);
    expect(output.price).toEqual(input.price);
  });
});
