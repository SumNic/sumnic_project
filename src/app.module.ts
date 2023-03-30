import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.model';
import { Profile } from './users/profile-users.model';
import { TextModule } from './text/text.module';
import { Text } from './text/text.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWOR,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Profile, Text],
      synchronize: true,
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    TextModule,
    FilesModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
