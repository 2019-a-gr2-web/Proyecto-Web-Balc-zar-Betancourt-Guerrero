import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UsuarioCreateDto {

   
    @IsEmpty()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    fkTipoUsuario: number;

    @IsNotEmpty()
    @IsString()
    usuario: string;

    @IsNotEmpty()
    @IsString()
    contrasenia: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsNumber()
    cedula: number;


}