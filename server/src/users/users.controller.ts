import { UserEntity, UsersService } from './users.service';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';
import { CreateUserDto } from './dto/createUser.dto';

// https://docs.nestjs.com/controllers

// https://web.postman.co/workspace/My-Workspace~845f57bc-1da4-47f2-89e0-2c09f482aeaa/request/24862975-67e752d3-d81c-47b9-ba50-bddf9e49f3e3

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async create(@Body(new ValidationPipe()) userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(): UserEntity[] {
        return this.usersService.findAll();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
        return this.usersService.updateById(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.deleteById(id);
    }
}
