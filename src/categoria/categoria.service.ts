import { Injectable } from "@nestjs/common";
import { Repository, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"
import { CategoriaEntity } from "./categoria.entity";
import { Categoria } from "./Interface/categoria";

@Injectable()
export class CategoriaService {

    constructor(@InjectRepository(CategoriaEntity)
    private readonly _categoriaRepositorio: Repository<CategoriaEntity>) {

        const categoria1: Categoria = {
            nombre: 'Miedo'
        };

        const categoria2: Categoria = {
            nombre: 'Drama'
        };

        const categoria3: Categoria = {
            nombre: 'Amor'
        };

        const categoria4: Categoria = {
            nombre: 'Accion'
        };

        /*this.registrarCategoria(categoria1);
        this.registrarCategoria(categoria2);
        this.registrarCategoria(categoria3);
        this.registrarCategoria(categoria4);*/


    }

    //NOTA: por ahora de manera asincrona,solo para pruebas de insercion de libros
    registrarCategoria(nuevaCategoria: Categoria) {

        const objetoEntidad = this._categoriaRepositorio.create(nuevaCategoria);

        this._categoriaRepositorio.save(objetoEntidad).then(
            (datos) => {
                console.log('dato creado', datos);
            }
        ).catch(
            (error) => { 
                //console.error('Error:', error);
            }
        )
    }

    //asincrona por ahora
    buscar(parametroBusqueda?) {
        return this._categoriaRepositorio.find(parametroBusqueda);
    }

    buscarporId(idbuscar:number):Promise<CategoriaEntity[]> {
        return this._categoriaRepositorio.find({ id: idbuscar });
    }


}