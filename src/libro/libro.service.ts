import { Injectable } from "@nestjs/common";
import { LibroEntity } from "./libro.entity";
import { Repository, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Libro } from "./Interface/libro";

@Injectable()
export class LibroService {

    constructor(@InjectRepository(LibroEntity)
    private readonly _librosRepositorio: Repository<LibroEntity>) {


    }


    //NOTA: por ahora de manera asincrona,solo para pruebas de insercion de libros
    registrarCategoria(nuevaLibro: Libro) {

        const objetoEntidad = this._librosRepositorio.create(nuevaLibro);

        this._librosRepositorio.save(objetoEntidad).then(
            (datos) => {
                console.log('dato creado', datos);
            }
        ).catch(
            (error) => {
                //console.error('Error:', error);
            }
        )
    }

    buscar(parametroBusqueda?): Promise<Libro[]> {
        return this._librosRepositorio.find(parametroBusqueda);
    }


    //buscar JOIN con la de rompimiento y la categoria
    buscarJoin() {

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

    /*editardelaBD(idtragoOriginal: number, tragoEditado: Trago) {
        return this._tragosRepositorio.update(idtragoOriginal,
            { nombre: tragoEditado.nombre, tipo: tragoEditado.tipo, gradoAlcohol: tragoEditado.gradoAlcohol, precio: tragoEditado.precio, fechaCaducidad: tragoEditado.fechaCaducidad });
    }*/

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
                titulo: libroEditado.isbn,
                autor: libroEditado.autor,
                edicion: libroEditado.edicion,
                editorial: libroEditado.editorial,
                precio: libroEditado.precio
            });
    }


}