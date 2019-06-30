import { Injectable } from "@nestjs/common";
import { Repository, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HistorialCategoriaLibroEntity } from "./historialCategoriaLibro.entity";
import { HistorialCategoriaLibro } from "./Interface/historialCategoriaLibro";

@Injectable()
export class HistorialCategoriaLibroService {
    
    constructor(@InjectRepository(HistorialCategoriaLibroEntity)
    private readonly _historialcategoriaRepositorio: Repository<HistorialCategoriaLibroEntity>) {


    }


    registrarHistorialCategoria(objetoHistorialCategoria:HistorialCategoriaLibroEntity){

        const objetoEntidad=this._historialcategoriaRepositorio.create(objetoHistorialCategoria);

        this._historialcategoriaRepositorio.save(objetoEntidad);
        

    }
}