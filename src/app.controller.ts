import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user/user.service';
import { CreateUserDto } from './dtos/generated/create-user.dto';

@Controller("api")
export class AppController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getHello() {
    return this.userService.users({
      orderBy: {
        name: "asc"
      }
    })
  }

  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.userService.create({
      email: data.email,
      name: data.name,
      description: data.description
    })
  }
}
