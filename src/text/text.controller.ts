import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateTextDto } from './dto/create-text.dto';
import { Text } from './text.model';
import { TextService } from './text.service';

@ApiTags('Текстовые блоки')
@Controller('text')
export class TextController {

    constructor(private textService: TextService) {}

    @ApiOperation({summary: 'Создание текстового блока'})
    @ApiResponse({status: 200, type: Text})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    createText(@Body() dto: CreateTextDto,
        @UploadedFile() image) {

        return this.textService.create(dto, image);
    }

    @ApiOperation({summary: 'Редактирование текстового блока с файлом'})
    @ApiResponse({status: 200, type: Text})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/update/:id')
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    updateText(@Param('id') id: number, 
                @Req() req: any, 
                @Body() dto: CreateTextDto,
                @UploadedFile() image) {

        return this.textService.update(id, req, dto, image);
    }

    @ApiOperation({summary: 'Удаление текстового блока с файлом'})
    @ApiResponse({status: 200, type: Text})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/delete/:id')
    // UseInterceptors - декоратор для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    deleteText(@Param('id') id: number) {

        return this.textService.deleteOne(id);
    }

    @ApiOperation({summary: 'Получение текстового блока по уникальному названию'})
    @ApiResponse({status: 200, type: Text})
    @Get('name/:title')
    getTextTitle(@Param('title') title: string) {
        return this.textService.getTextName(title);
    }

    @ApiOperation({summary: 'Получение текстового блока по названию группы'})
    @ApiResponse({status: 200, type: Text})
    @Get('grup/:grup')
    getTextGrup(@Param('grup') grup: string) {
        return this.textService.getTextGrup(grup);
    }

    @ApiOperation({summary: 'Получение всех текстовых блоков'})
    @ApiResponse({status: 200, type: [Text]})
    @Get('/get')
    getAll() {
        return this.textService.getAllText();
    }
}
