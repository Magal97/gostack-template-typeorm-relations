import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CreateCustomerService')
    private customersRepository: ICustomersRepository
    ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const checkEmail = await this.customersRepository.findByEmail(email);

    if(checkEmail){
      throw new AppError('Email already in use.');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
