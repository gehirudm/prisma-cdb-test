import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    user(email: string) {
        return this.prisma.user.findMany({
            where: {
                email
            }
        })
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        let usersWithEmail = await this.user(data.email)
        if (usersWithEmail.length != 0) {
            throw new BadRequestException("user with email already exist")
        }
        return this.prisma.user.create({ data });
    }
}
