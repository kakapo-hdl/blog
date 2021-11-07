import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const database: TypeOrmModuleOptions = {
  type: 'mssql',
  host: '42.192.144.217',
  // port: 1433,
  username: 'SA',
  password: 'nM7894561230',
  database: 'blog',
  entities: ['src/**/**.entity{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
  extra: {
    trustServerCertificate: true,
  },
};
