import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileModule } from './profile/profile.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { Profile } from './profile/profile.model';
import { TextModule } from './text/text.module';
import { Text } from './text/text.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { User } from './auth/auth.model';
import { Files } from './files/files.model';

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
      models: [User, Role, UserRoles, Profile, Text, Files],
      synchronize: true,
      autoLoadModels: true
    }),
    ProfileModule,
    RolesModule,
    AuthModule,
    TextModule,
    FilesModule,
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    // }),
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
