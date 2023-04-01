import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Text } from './text.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { Files } from 'src/files/files.model';
import { User } from 'src/auth/auth.model';

@Module({
  providers: [TextService],
  controllers: [TextController],
  imports: [
    SequelizeModule.forFeature([User, Text, Files]),
    FilesModule,
    AuthModule
  ]
})
export class TextModule {}
