import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { query } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService){}

    // @Get() //GET /users
    // findAll(){
    //  return []
    // }

    // FindAll with query parameters
    @Get() //GET /users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
     return this.usersService.findAll(role)
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id:number){
     return this.usersService.findOne(id)
    }

    @Post() //POST //Users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto){
      return this.usersService.create(createUserDto)
    }

    @Patch(':id') //PATCH //Users
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto){
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') //DELETE //Users
    delete(@Param('id', ParseIntPipe) id:number){
        return this.usersService.delete(id)
    }
}
