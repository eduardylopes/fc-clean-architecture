import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import FindProductUseCase from './find.product.usecase';
import Product from '../../../domain/product/entity/product';

describe('Integration test for find product use case', () => {
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

  it('should find a product', async () => {
    const repository = new ProductRepository();
    const useCase = new FindProductUseCase(repository);

    const product = new Product('123', 'Product Name', 10);
    await repository.create(product);

    const input = {
      id: product.id,
    };

    const output = await useCase.execute(input);

    expect(output.id).toEqual(input.id);
    expect(output.name).toEqual(product.name);
    expect(output.price).toEqual(product.price);
  });
});
