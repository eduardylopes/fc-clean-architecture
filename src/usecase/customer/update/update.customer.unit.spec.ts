import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress(
  'John',
  new Address('Street', 123, 'Zip', 'City')
);

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street updated',
    number: 321,
    zip: 'Zip Updated',
    city: 'City Updated',
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('Unit test for update customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
