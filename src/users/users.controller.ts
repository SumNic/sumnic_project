import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    // @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/update')
    update(@Body() editDto: UpdateUserDto) {
        return this.userService.updateUser(editDto);
    }

//     @Delete(':id')
//     remove(@Param('id') id: string) {
//     return this.userService.remove(+id);
//   }
}
