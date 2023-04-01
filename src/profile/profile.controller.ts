import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateProfileDto } from './dto/create-profil.dto';
import { ProfileService } from './profile.service';

@Controller('users')
export class ProfileController {

    constructor(private profileService: ProfileService,
        private authService: AuthService,) {}

    @Post('/registration')
    @UseInterceptors(FileInterceptor('image'))
    registration(@Body() dto: CreateProfileDto,
    @UploadedFile() image: any) {
        return this.profileService.createUser(dto, image);
    }

    @Post('/login')
    @UseInterceptors(FileInterceptor('image'))
    login(@Body() dto: CreateProfileDto) {
        return this.authService.login(dto);
    }

    // Получение всех пользователей
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.profileService.getAllUsers();
    }

    // Редактирование пользователя по id - допуск ADMIN
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/update/:id')
    @UseInterceptors(FileInterceptor('image'))
    update(@Param('id') id: number, @Body() editDto: CreateProfileDto) {
        return this.profileService.updateUser(id, editDto);
    }

    // Редактирование своего профиля
    @UseGuards(JwtAuthGuard)
    @Put('/update')
    @UseInterceptors(FileInterceptor('image'))
    updateSelf(@Req() req: any, @Body() editDto: CreateProfileDto) {
        return this.profileService.updateOneUser(req, editDto);
    }

    // Удаление пользователя ADMIN-ом
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/delete/:id')
    @UseInterceptors(FileInterceptor('image'))
    remove(@Param('id') id: number) {
    return this.profileService.removeUser(+id);
    }

    // Удаление своей страницы
    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    @UseInterceptors(FileInterceptor('image'))
    removeSelf(@Req() req: any) {
    return this.profileService.removeOneUser(req);
    }
}
