import { Sequelize } from 'sequelize-typescript';
import CreateProductUseCase from './create.product.usecase';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';

describe('Integration test for create product use case', () => {
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
  it('should create a product', async () => {
    const repository = new ProductRepository();
    const useCase = new CreateProductUseCase(repository);

    const input = {
      name: 'Product A',
      price: 20.9,
    };

    const output = await useCase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toEqual(input.name);
    expect(output.price).toEqual(input.price);
  });
});
