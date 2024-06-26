import Customer from '../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { OutputCreateCustomerDto } from '../create/create.customer.dto';
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from './list.customer.dto';

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          city: customer.Address.city,
          number: customer.Address.number,
          zip: customer.Address.zip,
        },
      })),
    };
  }
}
