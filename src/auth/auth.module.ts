import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Profile } from 'src/profile/profile.model';
import { ProfileModule } from 'src/profile/profile.module';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './auth.model';
import { Files } from 'src/files/files.model';

@Module({
  // controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Profile]),
    forwardRef(() => ProfileModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
  ],
  
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {} 
