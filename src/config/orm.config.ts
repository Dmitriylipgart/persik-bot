import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    // type: 'postgres',
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    url: process.env.DATABASE_URL,
    type: 'postgres',
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    autoLoadEntities: true,
    synchronize: true,
  }),
);
