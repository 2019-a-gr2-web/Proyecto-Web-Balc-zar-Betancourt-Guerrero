import { Injectable } from "@nestjs/common";
import { FacturaEntity } from "./factura.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Factura } from "./Interface/factura";

@Injectable()
export class FacturaService {

    constructor(@InjectRepository(FacturaEntity)
    private readonly _facturaRepositorio: Repository<FacturaEntity>) {

    }

    registrarFactura(nuevaFactura: Factura): Promise<FacturaEntity> {
        const objetoEntidad = this._facturaRepositorio
            .create(nuevaFactura);

        return this._facturaRepositorio.save(objetoEntidad);
    }
}