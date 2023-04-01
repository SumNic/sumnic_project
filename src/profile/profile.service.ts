import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateProfileDto } from './dto/create-profil.dto';
import { Profile } from './profile.model';
import * as bcrypt from 'bcryptjs'; 
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from "@nestjs/jwt";
import { User } from 'src/auth/auth.model';
import { Files } from 'src/files/files.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProfileService {

    constructor(
        @InjectModel(Profile) private profileRepository: typeof Profile,
                        private fileService: FilesService,
                        // private profileService: ProfileService,
                @InjectModel(User) 
                        private userRepository: typeof User,
                        private authService: AuthService,
                        private roleService: RolesService,
                        private jwtService: JwtService,

                // @InjectModel(Files) private filesRepository: typeof Files,
                        // private fileService: FilesService,
                        ) {}

    async createUser(dto: CreateProfileDto, image: any) {
        // Регистрация с помощью блока auth и создаем User
        const user_auth = await this.authService.registration(dto);
        console.log(user_auth.id)
        const user = await this.userRepository.findByPk(user_auth.id);
        // Создаем профиль
        const profile = await this.profileRepository.create(dto);
        // // Добавляем фотографию профиля в базу данных и на сервер
        const files = await this.fileService.createFile(dto, image, profile.id, profile.essenceTable);
        await user.$set('profile', [profile.id]);
        user.profile = [profile];
        const role = await this.roleService.getRoleByValue("ADMIN");
        await user.$set('roles', [role.id]);
        user.roles = [role];
        
        // await profile.$set('files', [files.id]);
        return this.getOneUsers(user.email);
    }

    async getOneUsers(email: string) { 
        const users = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return users;
    }

    async getAllUsers() { 
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    } 

    // async getUserByEmail(email: string) {
    //     const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
    //     return user;
    // }

    async updateUser(id: number, editDto: CreateProfileDto) {
        console.log(editDto)
        const candidate = await this.getOneUsers(editDto.email);
        
        // Проверка, чтобы меняемый email не совпадал с email уже существующих пользователей,
        // то есть этот email может быть только у редактируемого пользователя
        if(candidate && candidate.id !== +id) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository.findByPk(id);
        const profile = await this.profileRepository.findByPk(id);
        const hashPassword = await bcrypt.hash(editDto.password, 5);
        await user.update({...editDto, password: hashPassword});
        await profile.update({...editDto});
        return user;
    }

    async updateOneUser(req: any, editDto: CreateProfileDto) {
        const id = req.user.id;
        const candidate = await this.authService.getUserByEmail(editDto.email);
        // Проверка, чтобы меняемый email не совпадал с email уже существующих пользователей,
        // то есть этот email может быть только у редактируемого пользователя
        if(candidate && candidate.id !== +id) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository.findByPk(id);
        const profile = await this.profileRepository.findByPk(id);
        const hashPassword = await bcrypt.hash(editDto.password, 5);
        await user.update({...editDto, password: hashPassword});
        await profile.update({...editDto});
        return user;
    }

    async removeUser(id: number) {
        const user = await this.userRepository.findByPk(id);
        if(!user) {
            throw new HttpException('Указанный пользователь не существует', HttpStatus.BAD_REQUEST);
        }
        const profile = await this.profileRepository.findByPk(id);
        await user.destroy();
        await profile.destroy();
        return 'Пользователь успешно уделён!';
    }

    async removeOneUser(req: any) {
        const id = req.user.id;
        const user = await this.userRepository.findByPk(id);
        if(!user) {
            throw new HttpException('Указанный пользователь не существует', HttpStatus.BAD_REQUEST);
        }
        const profile = await this.profileRepository.findByPk(id);
        await user.destroy();
        await profile.destroy();
        return 'Ваша страница удалена!';
    }
}