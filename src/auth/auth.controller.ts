import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { AuthService } from './auth.service';
import { Roles } from './roles-auth.decorator';
import { RolesGuard } from './roles.guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/update/:id')
    update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
        return this.authService.updation(id, userDto);
    }
}
