import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Files } from 'src/files/files.model';
import { FilesService } from 'src/files/files.service';
import { locales } from 'validator/lib/isIBAN';
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
    async create(req: any, dto: CreateTextDto, image: any) {
        // Из обертки @UseGuards получаем req, из которого извлекаем id автора текстового сообщения
        // const id = req.user.id;
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
        const files = await this.fileService.getFile(text.id, text.essenceTable);
        return [text, files];
    }

    // Получение текста по уникальному названию
    async getAllText() {
        const text = await this.textRepository.findAll();
        // const files = await this.fileService.getFile(text.id, text.essenceTable);
        // console.log(files)
        // text.essenceTable = [file.image];
        return text;
    }


}
