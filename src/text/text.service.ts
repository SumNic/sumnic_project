import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateTextDto } from './dto/create-text.dto';
import { Text } from './text.model';

@Injectable()
export class TextService {

    // Заинжектим модель
    constructor(@InjectModel(Text) private textRepository: typeof Text,
    private fileService: FilesService) {}

    // Получение текста по уникальному названию
    async getTextByUniqTitle(uniq_title: string) {
        const text = await this.textRepository.findOne({where: {uniq_title}, include: {all: true}});
        return text;
    }

    async create(req: any, dto: CreateTextDto, image: any) {
        const id = req.user.id;
        const candidate = await this.getTextByUniqTitle(dto.uniq_title);
        // Проверка уникальности названия
        if(candidate) {
            throw new HttpException('Необходимо указать уникальное название', HttpStatus.BAD_REQUEST);
        }
        // Сохраним текст в базу данных
        // createFile - возвращает название файла
        const fileName = await this.fileService.createFile(image); 
        const text = await this.textRepository.create({...dto, userId: id, image: fileName});
        return text;
    }
    
    async updateOne(id: number, req: any, dto: CreateTextDto, image: any) {
        const userId = req.user.id;
        const text = await this.textRepository.findByPk(id);
        const candidate = await this.getTextByUniqTitle(dto.uniq_title);
        // Проверка уникальности названия
        if(candidate && candidate.id !== +id) {
            throw new HttpException('Необходимо указать уникальное название', HttpStatus.BAD_REQUEST);
        }
        // Проверяем, есть ли в запросе файл
        if(image) {
            // Удалить текущий файл с сервера
            await this.fileService.deleteFile(text.image);
            // Сохраним текст в базу данных
            // createFile - возвращает название файла
            const fileName = await this.fileService.createFile(image); 
            await text.update({...dto, userId: userId, image: fileName});
        } else {
            await text.update({...dto, userId: userId});
        }
        
        return text;
    }

    async deleteOne(id: number) {
        const text = await this.textRepository.findByPk(id);
        // Проверка уникальности названия
        if(!text) {
            throw new HttpException('Указанный текстовый блок не существует', HttpStatus.BAD_REQUEST);
        }
        // Проверяем, есть ли на сервере файл, относящийся к этому блоку
        if(text.image) {
            // Удалить текущий файл с сервера
            await this.fileService.deleteFile(text.image);
        }
        
        // Удаляем текстовый блок из базы данных
        await text.destroy();
        return text;
    }


}
