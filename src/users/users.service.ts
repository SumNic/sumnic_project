import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Profile } from './profile-users.model';
import { User } from './users.model';

@Injectable()
export class UsersService {
    remove(arg0: number) {
        throw new Error('Method not implemented.');
    }

    constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    @InjectModel(Profile) private profileRepository: typeof Profile) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const profile = await this.profileRepository.create(dto);
        await user.$set('profile', [profile.id]);
        user.profile = [profile];
        const role = await this.roleService.getRoleByValue("ADMIN");
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

    async updateUser(id: number, dto: UpdateUserDto) {
        const user = await this.userRepository.update({...dto }, {where: {id}} )
        const profile = await this.profileRepository.update({...dto }, {where: {id}});
        return user;
    }
}
