import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateTextDto } from './dto/create-text.dto';
import { TextService } from './text.service';

@Controller('text')
export class TextController {

    constructor(private textService: TextService) {}

    // Создание текстовых блоков
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    createText(@Req() req: any, @Body() dto: CreateTextDto,
        @UploadedFile() image) {

        return this.textService.create(req, dto, image);
    }

    // Редактирование текстового блока и файла с сервера
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/update/:id')
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    updateText(@Param('id') id: number, 
                @Req() req: any, 
                @Body() dto: CreateTextDto,
                @UploadedFile() image) {

        return this.textService.updateOne(id, req, dto, image);
    }

    // Удаление текстового блока и файла с сервера
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/delete/:id')
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    deleteText(@Param('id') id: number) {

        return this.textService.deleteOne(id);
    }

    // Получение всего списка
    @Get('/get')
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    getText(@Param('id') id: number, 
                @Req() req: any, 
                @Body() dto: CreateTextDto,
                @UploadedFile() image) {

        return this.textService.updateOne(id, req, dto, image);
    }


}
