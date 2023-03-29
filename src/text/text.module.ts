import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Text } from './text.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TextService],
  controllers: [TextController],
  imports: [
    SequelizeModule.forFeature([User, Text]),
    FilesModule,
    AuthModule
  ]
})
export class TextModule {}
