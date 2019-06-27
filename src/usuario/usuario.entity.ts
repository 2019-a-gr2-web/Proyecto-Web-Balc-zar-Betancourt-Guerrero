import { Entity, ManyToOne } from "typeorm";
import { Column } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { TipoUsuarioEntity } from "../tipoUsuario/tipoUsuario.entity";


@Entity('bd_usuario') //aqui se pasa el nombre tabla (se puede)
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'usuario', //nombre que quiero que se ponga directamente en la bd
        type: 'varchar',
        length: 70
    })
    usuario: string;//este es el nombre del codigo, pero en la bd se muestra como esta arriba

    @Column({
        type: 'varchar',
        length: 70,
        name: 'password',
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombre',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'apellido',
    })
    apellido: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'cedula',
    })
    cedula: string;

    @ManyToOne(
        type => TipoUsuarioEntity,
        tipousuario => tipousuario.usuarios
    )
    tipousuarioFK: TipoUsuarioEntity;



}