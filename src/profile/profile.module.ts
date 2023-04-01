import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { Profile } from './profile.model';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { User } from 'src/auth/auth.model';
import { Files } from 'src/files/files.model';
import { FilesModule } from 'src/files/files.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Profile, Files]),
    RolesModule,
    // AuthModule,
    forwardRef(() => AuthModule),
    FilesModule,
    // AuthModule
  ],
  exports: [
    ProfileService
  ]
})
export class ProfileModule {} 
