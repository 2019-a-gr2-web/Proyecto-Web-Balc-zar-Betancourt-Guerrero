import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { DetalleEntity } from '../detalle/detalle.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity('factura') //Podemos pasr el nombre de la tabla
export class FacturaEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    name: 'numeroTarjeta',
    nullable: true,
  })
  numeroTarjeta: string;

  @Column({
    type: 'varchar',
    name: 'cvcTarjeta',
    nullable: true,
  })
  cvc: string;

  @Column({
    type: 'varchar',
    name: 'formaPago',
    nullable: true,
  })
  formaPago: string;

  @Column({
    type: 'date',
    name: 'fechaCaducidadTarjeta',
    default: '2020-12-31'
  })
  fechaCaducidadTarjeta: Date;

  @Column({
    type: 'date',
    name: 'fecha',
  })
  fecha: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'montoTotal',
    nullable: true,
    default: 0
  })
  montoTotal: number;

  @Column({
    type: 'nvarchar',
    name: 'direccionCliente',
    nullable: true
  })
  direccionCliente: string;

  @Column()
  fk_usuario: number;
  @ManyToOne(type => UsuarioEntity, usuario => usuario.facturas)
  @JoinColumn({ name: 'fk_usuario' })
  fkUsuario: UsuarioEntity;


  @OneToMany(type => DetalleEntity, detalle => detalle)
  detalles?: DetalleEntity[];

}