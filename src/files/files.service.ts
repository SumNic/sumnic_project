import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFileDto } from './dto/create-file.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';   
import { Files } from './files.model';

@Injectable()
export class FilesService {

    constructor(@InjectModel(Files) private filesRepository: typeof Files) {}

    async createFile(dto: CreateFileDto, image: any, essenceId: number, essenceTable: string) {
        try {
            console.log(essenceId)
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..','static');
            if(!fs.existsSync(filePath)) {
                // recursive - если такой папки нет, то node её создаст
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), image.buffer);
            const files = await this.filesRepository.create({...dto, image: fileName, essenceId, essenceTable});
            return files;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateFile(Table: string, id: number, image: any) {
        try {
            const files = await this.filesRepository.findOne({ where: { essenceTable: Table, essenceId: id}, include: {all: true} });
            const fileName = files.image;
            const filePath = path.resolve(__dirname, '..','static');
            // Перезапись файла на сервере
            fs.writeFileSync(path.join(filePath, fileName), image.buffer);
        } catch (e) {
            throw new HttpException('Произошла ошибка при замене файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteFile(Table: string, id: number) {
        try {
            const files = await this.filesRepository.findOne({ where: { essenceTable: Table, essenceId: id}, include: {all: true} });
            const fileName = files.image;
            const filePath = path.resolve(__dirname, '..','static');
            // Удаление файла с сервера
            fs.unlinkSync(path.join(filePath, fileName));
            // Удаление файла из базы данных
            await files.destroy();
        } catch (e) {
            throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getFile(id: number, Table: string) {
        try {
            const files = await this.filesRepository.findOne({ where: { essenceTable: Table, essenceId: id}, include: {all: true} });
            return files;
        } catch (e) {
            throw new HttpException('Произошла ошибка при поиске файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllFile(id: number, Table: string) {
        try {
            const files = await this.filesRepository.findAll({ where: { essenceTable: Table, essenceId: id}, include: {all: true} });
            return files;
        } catch (e) {
            throw new HttpException('Произошла ошибка при поиске файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
