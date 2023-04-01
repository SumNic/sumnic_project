import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/auth/auth.model';
import { AuthModule } from 'src/auth/auth.module';
import { Profile } from 'src/profile/profile.model';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { UserRoles } from './user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles, Profile]),
    AuthModule
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
