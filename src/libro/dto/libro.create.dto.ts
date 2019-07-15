import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class LibroCreateDto {

    @IsEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    isbn: string;

    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    autor: string;

    @IsNotEmpty()
    @IsNumber()
    edicion: number;

    @IsNotEmpty()
    @IsString()
    editorial: string;


    @IsNotEmpty()
    @IsNumber()
    precio: number;

    @IsNotEmpty()
    @IsString()
    estado: string;


}