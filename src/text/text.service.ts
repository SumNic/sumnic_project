import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateTextDto } from './dto/create-text.dto';
import { Text } from './text.model'; 

@Injectable()
export class TextService {

    // Заинжектим модель
    constructor(@InjectModel(Text) private textRepository: typeof Text,
    private fileService: FilesService
    ) {}

    // Проверка title на уникальность
    async getTextByUniqTitle(uniq_title: string) {
        const text = await this.textRepository.findOne({where: {uniq_title}, include: {all: true}});
        return text;
    }

    // Создание текстового блока
    async create(dto: CreateTextDto, image: any) {
        const candidate = await this.getTextByUniqTitle(dto.uniq_title);
        // Проверка уникальности названия
        if(candidate) {
            throw new HttpException('Необходимо указать уникальное название', HttpStatus.BAD_REQUEST);
        }

        // Сохраним текстовый блок в базу данных
        console.log()
        const text = await this.textRepository.create({...dto});
        // Сохраняем файл в базе данных и на сервере
        await this.fileService.createFile(dto, image, text.id, text.essenceTable);
        return text;
    }
    
    async update(id: number, req: any, dto: CreateTextDto, image: any) {
        const userId = req.user.id;
        const text = await this.textRepository.findByPk(id);
        const candidate = await this.getTextByUniqTitle(dto.uniq_title);
        // Проверка уникальности названия
        if(candidate && candidate.id !== +id) {
            throw new HttpException('Необходимо указать уникальное название', HttpStatus.BAD_REQUEST);
        }
        // Проверяем, есть ли в запросе файл, который необходимо изменить
        if(image) {
            // Если есть, то меняем текущий файл на сервере на новый
            await this.fileService.updateFile(text.essenceTable, text.id, image);  
        } 
        // Перезаписываем текстовый блок в базу данных
        await text.update({...dto});
        return text;
    }

    async deleteOne(id: number) {
        const text = await this.textRepository.findByPk(id);
        // Проверяем, существует ли запись с указанным id 
        if(!text) {
            throw new HttpException('Указанный текстовый блок не существует', HttpStatus.BAD_REQUEST);
        }
        // Удалить текущий файл с сервера
        await this.fileService.deleteFile(text.essenceTable, id);
        // Удаляем текстовый блок из базы данных
        await text.destroy();
        return text;
    }
    
    // Получение текста по уникальному названию 
    async getTextName(uniq_title: string) {
        const text = await this.textRepository.findOne({where: {uniq_title}, include: {all: true}});
        return text;
    }

    // Получение текста по НАЗВАНИЮ ГРУППЫ
    async getTextGrup(grup: string) {
        const text = await this.textRepository.findAll({where: {grup}, include: {all: true}});
        return text;
    }

    // Получение всех текстовых блоков
    async getAllText() {
        const text = await this.textRepository.findAll();
        return text;
    }


}
