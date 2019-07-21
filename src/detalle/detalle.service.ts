import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleEntity } from './detalle.entity';

@Injectable()
export class DetalleService {
  constructor(@InjectRepository(DetalleEntity)
  private readonly _detalleRepositorio: Repository<DetalleEntity>){
      
  }

  registrarDetalle(fkLibro:number,fkFactura:number,cantidad:number): Promise<DetalleEntity> {

    const nuevoDetalle=new DetalleEntity();
    nuevoDetalle.fk_libro=fkLibro;
    nuevoDetalle.fk_factura=fkFactura;
    nuevoDetalle.cantidad=cantidad;

    const objetoEntidad = this._detalleRepositorio
        .create(nuevoDetalle);

    return this._detalleRepositorio.save(objetoEntidad);
}


}