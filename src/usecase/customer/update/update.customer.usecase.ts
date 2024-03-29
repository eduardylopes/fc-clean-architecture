import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../domain/customer/value-object/address';
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from './update.customer.dto';

export default class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    await this.customerRepository.update(customer);

    return {
      id: input.id,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
      },
    };
  }
}
