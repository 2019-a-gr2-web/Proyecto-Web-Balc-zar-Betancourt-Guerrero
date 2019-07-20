import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetalleEntity } from '../detalle/detalle.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity('factura') //Podemos pasr el nombre de la tabla
export class FacturaEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'bigint',
    name: 'numeroTarjeta',
    nullable: true,
  })
  numeroTarjeta: string;

  @Column({
    type: 'bigint',
    name: 'cvcTarjeta',
    nullable: true,
  })
  cvc: string;

  @Column({
    type: 'date',
    name: 'fechaCaducidadTarjeta',
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

  @ManyToOne(type => UsuarioEntity, usuario => usuario.facturas)
  fkUsuario: UsuarioEntity;

  @OneToMany(type => DetalleEntity, detalle => detalle)
  detalles: DetalleEntity[];

}