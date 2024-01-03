import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // By default, the type is varchar
  name: string;

  @Column('decimal') // By default, the precision is 10 and the scale is 0
  price: number;

  @Column('int') // By default, the type is int4
  quantity: number;

  @CreateDateColumn() // By default, the type is timestamp with time zone
  created_at: Date;

  @UpdateDateColumn() // By default, the type is timestamp with time zone
  updated_at: Date;
}

export default Product;
