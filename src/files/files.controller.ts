import { Body, Controller, Delete, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Files } from './files.model';

@ApiTags('Файлы')
@Controller('files')
export class FilesController {
    
    constructor(private fileService: FilesService) {}

    @ApiOperation({summary: 'Добавление файла'})
    @ApiResponse({status: 200, type: Files})
    @UseGuards(JwtAuthGuard)
    @Post()
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    createFile(@Body() dto: CreateFileDto, @UploadedFile() image, essenceId: number, essenceTable: string) {

        return this.fileService.createFile(dto, image, essenceId, essenceTable);
    }

    @ApiOperation({summary: 'Удаление всех лишних файлов'})
    @ApiResponse({status: 200, description: 'Ok!'})
    @Delete('/delete')
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    deleteUnwantedFiles() {
        return this.fileService.deleteUnwantedFiles();
    }
}
