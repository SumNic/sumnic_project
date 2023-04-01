import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { Files } from './files.model';
import { FilesController } from './files.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from 'src/profile/profile.model';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
  imports: [
    SequelizeModule.forFeature([Files, Profile]),
    AuthModule]
})
export class FilesModule {}
