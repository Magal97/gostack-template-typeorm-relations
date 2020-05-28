import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Order, order => order.id)
  @JoinColumn({name: 'order_id'})
  order: Order;

  @ManyToOne(type => Product, product => product.id)
  @JoinColumn({name: 'product_id'})
  product: Product;

  @Column()
  product_id: string;

  @Column()
  order_id: string;

  @Column({ type: 'numeric', precision: 10, scale: 2})
  price: number;

  @Column('integer')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
