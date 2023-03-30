import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { Files } from './files.model';
import { FilesController } from './files.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
  imports: [
    SequelizeModule.forFeature([Files]),
    AuthModule]
})
export class FilesModule {}
