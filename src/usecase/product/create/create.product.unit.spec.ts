import ProductFactory from '../../../domain/product/factory/product.factory';
import CreateProductUseCase from './create.product.usecase';

const product = ProductFactory.create('a', 'Product A', 20.9);

const mockRepository = () => {
  return {
    create: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('Unit test for create product use case', () => {
  it('should create a product', async () => {
    const repository = mockRepository();
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
