import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { TipoUsuarioEntity } from '../tipoUsuario/tipoUsuario.entity';
import { FacturaEntity } from '../factura/factura.entity';


@Entity('usuario') //aqui se pasa el nombre tabla (se puede)
export class UsuarioEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'usuario', //nombre que quiero que se ponga directamente en la bd
    type: 'varchar',
    length: 70,
  })
  usuario: string;//este es el nombre del codigo, pero en la bd se muestra como esta arriba

  @Column({
    type: 'nvarchar',
    length: 70,
    name: 'contrasenia',
  })
  contrasenia: string;

  @Column({
    type: 'nvarchar',
    length: 70,
    name: 'nombre',
 })
  nombre: string;

  @Column({
    type: 'nvarchar',
    length: 70,
    name: 'apellido',
  })
  apellido: string;

  @Column({
    type: 'bigint',
    name: 'cedula'
  })
  cedula: number;

  @Column({
    type: 'nvarchar',
    length: 70,
    name: 'direccion',
 })
  direccion: string;

  @ManyToOne(type => TipoUsuarioEntity, tipousuario => tipousuario.usuarios)
  @JoinColumn({name:'fkTipoUsuario'})
  fkTipoUsuario?: number;

  @OneToMany(type => FacturaEntity, facturas => facturas)
  facturas: FacturaEntity[];

}