import { v4 as uuid } from 'uuid';
import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product.usecase';

const productId = uuid();
const product = new Product(productId, 'Product Name', 10);

const mockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe('Unit test for find product use case', () => {
  it('should find a product', async () => {
    const repository = mockRepository();
    const useCase = new FindProductUseCase(repository);

    const input = {
      id: productId,
    };

    const output = await useCase.execute(input);

    expect(output.id).toEqual(input.id);
    expect(output.name).toBeDefined();
    expect(output.price).toBeDefined();
  });
});
