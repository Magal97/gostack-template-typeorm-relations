import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';
import AppError from '@shared/errors/AppError';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {

    const product = await this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;

  }

  public async findByName(name: string): Promise<Product | undefined> {

    const checkName = await this.ormRepository.findOne({
      where: {name},
    });

    if(!checkName){
      return undefined;
    }

    return checkName;

  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const idLista = products.map(product => product.id);

    const orderList = await this.ormRepository.find({
      id: In(idLista)
    });

    if(idLista.length !== orderList.length){
      throw new AppError('Missing product');
    }

    return orderList;

  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const productsData = await this.findAllById(products);

    const newProducts = productsData.map(product => {
      const productsFind = products.find(findProd =>
        findProd.id === product.id,
      );

      if(!productsFind){
        throw new AppError('Product not found.');
      };

      if(product.quantity < productsFind.quantity){
        throw new AppError('Insuficient product quantity.');
      };

      const prodQuantity = product;
      prodQuantity.quantity -= productsFind.quantity;

      return prodQuantity;

    });

    await this.ormRepository.save(newProducts);

    return newProducts;

  }
}

export default ProductsRepository;
