import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../users.service";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    age: number;

    @IsEnum(UserRole)
    role: UserRole;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsInt()
    phone: number;
}