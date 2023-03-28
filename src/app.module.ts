import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
// import { ProfileModule } from './profile/profile.module';
import { User } from './users/users.model';
import { Profile } from './users/profile-users.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWOR,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Profile],
      synchronize: true,
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
