import { Entity, ManyToOne } from "typeorm";
import { Column } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { UsuarioEntity } from "../usuario/usuario.entity";


@Entity('bd_tipousuario') //aqui se pasa el nombre tabla (se puede)
export class TipoUsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'tipo',
        type: 'varchar',
        length: 70
    })
    tipo: string;


    @OneToMany(type => UsuarioEntity, usuario => usuario)
    usuarios: UsuarioEntity[];

}