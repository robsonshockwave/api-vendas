import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { CreateProducts1702433345820 } from './migrations/1702433345820-CreateProducts';
import { CreateUsers1704335887083 } from './migrations/1704335887083-CreateUsers';
import { CreateUserTokens1704579331629 } from './migrations/1704579331629-CreateUserTokens';
import { CreateCustomers1704845271590 } from './migrations/1704845271590-CreateCustomers';
import { CreateOrders1704894963904 } from './migrations/1704894963904-CreateOrders';
import { AddCustomerIdToOrders1704895293063 } from './migrations/1704895293063-AddCustomerIdToOrders';
import { CreateOrdersProducts1704896271728 } from './migrations/1704896271728-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1704900552004 } from './migrations/1704900552004-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1704901074566 } from './migrations/1704901074566-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5433,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1702433345820,
    CreateUsers1704335887083,
    CreateUserTokens1704579331629,
    CreateCustomers1704845271590,
    CreateOrders1704894963904,
    AddCustomerIdToOrders1704895293063,
    CreateOrdersProducts1704896271728,
    AddOrderIdToOrdersProducts1704900552004,
    AddProductIdToOrdersProducts1704901074566,
  ],
});

// Criar uma migration
// npm run typeorm migration:create src/shared/infra/typeorm/migrations/NameOfMigration
