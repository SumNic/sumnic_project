import { Body, Controller, Delete, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('files')
export class FilesController {
    
    constructor(private fileService: FilesService) {}

    // Добавление файла
    @UseGuards(JwtAuthGuard)
    @Post()
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    createFile(@Body() dto: CreateFileDto, @UploadedFile() image, essenceId: number, essenceTable: string) {

        return this.fileService.createFile(dto, image, essenceId, essenceTable);
    }

    // // Удаление всех лишних файлов
    @Delete('/delete')
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    deleteUnwantedFiles() {
        return this.fileService.deleteUnwantedFiles();
    }

    // // Удаление текстового блока и файла с сервера
    // @Roles('ADMIN')
    // @UseGuards(RolesGuard)
    // @Delete('/delete/:id')
    // // UseInterceptors - декоратор для работы с файлами
    // @UseInterceptors(FileInterceptor('image'))
    // deleteText(@Param('id') id: number) {

    //     return this.textService.deleteOne(id);
    // }

    // // Получение всего списка
    // @Get('/get')
    // // UseInterceptors - декоратор для работы с файлами
    // @UseInterceptors(FileInterceptor('image'))
    // getText(@Param('id') id: number, 
    //             @Req() req: any, 
    //             @Body() dto: CreateTextDto,
    //             @UploadedFile() image) {

    //     return this.textService.updateOne(id, req, dto, image);
    // }


}
