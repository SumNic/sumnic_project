import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/update/:id')
    update(@Param('id') id: number, @Body() editDto: UpdateUserDto) {
        return this.userService.updateUser(id, editDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update')
    updateSelf(@Req() req: any, @Body() editDto: UpdateUserDto) {
        return this.userService.updateOneUser(req, editDto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/delete/:id')
    remove(@Param('id') id: number) {
    return this.userService.removeUser(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    removeSelf(@Req() req: any) {
    return this.userService.removeOneUser(req);
    }
}
