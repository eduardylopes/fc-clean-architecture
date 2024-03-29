import Product from '../../../domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';

const product = new Product('123', 'Product Name', 20.9);

const mockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn().mockReturnValue(product),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('Unit test for update product use case', () => {
  it('should update a product', async () => {
    const repository = mockRepository();
    const useCase = new UpdateProductUseCase(repository);

    const input = {
      id: '123',
      name: 'New Product Name',
      price: 30,
    };

    const output = await useCase.execute(input);

    expect(output.id).toEqual(input.id);
    expect(output.name).toEqual(input.name);
    expect(output.price).toEqual(input.price);
  });
});
