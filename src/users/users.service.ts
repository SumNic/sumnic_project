import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Profile } from './profile-users.model';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs'; 
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    remove(arg0: number) {
        throw new Error('Method not implemented.');
    }

    constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    // private authService: AuthService,
    @InjectModel(Profile) private profileRepository: typeof Profile) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const profile = await this.profileRepository.create(dto);
        await user.$set('profile', [profile.id]);
        user.profile = [profile];
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() { 
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    } 

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async updateUser(id: number, editDto: UpdateUserDto) {
        const candidate = await this.getUserByEmail(editDto.email);
        // Проверка, чтобы меняемый email не совпадал с email уже существующих пользователей,
        // то есть этот email может быть только у редактируемого пользователя
        if(candidate.id !== +id) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository.findByPk(id);
        const profile = await this.profileRepository.findByPk(id);
        const hashPassword = await bcrypt.hash(editDto.password, 5);
        await user.update({...editDto, password: hashPassword});
        await profile.update({...editDto});
        return editDto;
    }
}
