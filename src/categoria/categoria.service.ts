import { Injectable } from "@nestjs/common";
import { Repository, DeleteResult, getRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"
import { CategoriaEntity } from "./categoria.entity";
import { Categoria } from "./Interface/categoria";
import { HistorialCategoriaLibroEntity } from "../historialCategoriaLibro/historialCategoriaLibro.entity";

@Injectable()
export class CategoriaService {

    constructor(@InjectRepository(CategoriaEntity)
    private readonly _categoriaRepositorio: Repository<CategoriaEntity>) {
        
    }

    buscar(parametroBusqueda?) {
        return this._categoriaRepositorio.find(parametroBusqueda);
    }

    buscarporId(idbuscar: number): Promise<CategoriaEntity[]> {
        return this._categoriaRepositorio.find({ id: idbuscar });
    }

    detalles: CategoriaEntity[];
    buscarCategoriasPorLibro(idLibro: number): Promise<CategoriaEntity[]> {
        //let details;
        return getRepository(CategoriaEntity)
            .createQueryBuilder("categoria")
            .leftJoin(HistorialCategoriaLibroEntity, "historial", 'historial.categoriafkid = categoria.id')
            //.innerJoinAndSelect(CategoriaEntity, "categoria", 'categoria.id = historial.categoriafkid')
            .where('historial.librofkid = :id', { id: idLibro })
            .getMany();

        /*return this._categoriaRepositorio.query('SELECT categoria.id,categoria.nombre FROM categoria INNER JOIN historialcategorialibro ' +
            'ON historialcategorialibro.categoriafkid=categoria.id WHERE ' +
            'historialcategorialibro.librofkid=' + idLibro + ";");*/




    }



}