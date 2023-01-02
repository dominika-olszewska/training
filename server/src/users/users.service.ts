import { Injectable } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './dto/createUser.dto';


export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

export class UserEntity {
    id: string;
    name: string;
    age: number;
    role: UserRole;
    email: string;
    phone: number;

    @Exclude()
    password: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}


@Injectable()
export class UsersService {

    private usersArr = [{
        id: '1',
        name: 'Domi',
        age: 25,
        role: UserRole.ADMIN,
        email: 'domi@mail.com',
        password: 'd@M!3456',
        phone: 603456123
    }, {
        id: "2",
        name: 'Rafi',
        age: 26,
        role: UserRole.USER,
        email: 'rafi@mail.com',
        password: 'R@fa!234',
        phone: 603486123
    }]

    public findAll(): UserEntity[] {
        return this.usersArr.map(user => new UserEntity(user));
    }

    public findById(id: string): UserEntity {
        return this.getUserById(id);
    }

    public create(userDto: CreateUserDto): UserEntity {
        const id = `${this.usersArr.length + 1}`;
        this.usersArr.push({ ...userDto, id });
        return this.getUserById(id);
    }

    public deleteById(id: string): string {
        this.usersArr = this.usersArr.filter(user => user.id !== id);
        return id;
    }

    public updateById(id: string, userDto: CreateUserDto): UserEntity {
        this.usersArr = this.usersArr.map(user => user.id === id ? { ...user, ...userDto } : user)
        return this.getUserById(id);
    }

    private getUserById(id: string): UserEntity {
        return new UserEntity(this.usersArr.find(user => user.id === id));
    }
}

