import { Injectable } from "@nestjs/common";
import { LibroEntity } from "./libro.entity";
import { Repository, DeleteResult, getRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Libro } from "./Interface/libro";
import { HistorialCategoriaLibroEntity } from "../historialCategoriaLibro/historialCategoriaLibro.entity";
import { CategoriaEntity } from "../categoria/categoria.entity";

@Injectable()
export class LibroService {

    constructor(@InjectRepository(LibroEntity)
    private readonly _librosRepositorio: Repository<LibroEntity>) {

    }

    buscar(parametroBusqueda?): Promise<LibroEntity[]> {
        return this._librosRepositorio.find(parametroBusqueda);

        
    }


    buscarporId(idbuscar: number): Promise<Libro[]> {

        return this._librosRepositorio.find({ id: idbuscar })
    }


    buscarporParametro(bandera: number, stringbusscar: string) {
        if (bandera == 0) { //por autor

            return this._librosRepositorio.find({ autor: stringbusscar });

        } else if (bandera == 1) { //por titulo

            return this._librosRepositorio.find({ titulo: stringbusscar });

        } else if (bandera == 2) { //por categoria

            /*return this._librosRepositorio.find({ cat: stringbusscar });*/

        }

    }


    registrar(nuevoLibro: Libro): Promise<LibroEntity> {
        const objetoEntidad = this._librosRepositorio
            .create(nuevoLibro);

        return this._librosRepositorio.save(objetoEntidad);
    }

    eliminarDeLaBD(id: number): Promise<DeleteResult> {
        return this._librosRepositorio.delete(id);
    }

    //cambiar de estado Disponible a No diponible y viceversa
    cambiarEstado(idLibroAActualizar: number, nuevoestado: string) {


        if (nuevoestado == "Disponible") {
            nuevoestado = "No disponible";
        } else {
            nuevoestado = "Disponible";
        }
        return this._librosRepositorio.update(idLibroAActualizar,
            { estado: nuevoestado });
    }


    editarLibro(idLibroOriginal: number, libroEditado: Libro) {

        return this._librosRepositorio.update(idLibroOriginal,
            {
                isbn: libroEditado.isbn,
                titulo: libroEditado.titulo,
                autor: libroEditado.autor,
                edicion: libroEditado.edicion,
                editorial: libroEditado.editorial,
                precio: libroEditado.precio,
                estado: libroEditado.estado
            });
    }


    obtenerCategoriasPorLibro() {
        
        return this._librosRepositorio
        .query('SELECT libro.id,categoria.nombre,categoria.id as catid FROM libro,historialcategorialibro,categoria WHERE libro.id=historialcategorialibro.librofkid AND categoria.id=historialcategorialibro.categoriafkid');
        
    }



}