import { Controller, Get, Res, Post, Body, Session, Query } from "@nestjs/common";
import { Libro } from "./Interface/libro";
import { LibroService } from "./libro.service";
import { CategoriaService } from "../categoria/categoria.service";
//import { HistorialCategoriaLibroEntity } from "../historialCategoriaLibro/historialCategoriaLibro.entity";
import { HistorialCategoriaLibro } from "../historialCategoriaLibro/Interface/historialCategoriaLibro";
import { HistorialCategoriaLibroService } from "../historialCategoriaLibro/historialCategoriaLibro.service";
import { HistorialCategoriaLibroEntity } from "../historialCategoriaLibro/historialCategoriaLibro.entity";

@Controller('libro')
export class LibroController {

    estaEditando: boolean = false;

    constructor(private readonly _libroService: LibroService,
        private readonly _categoriaService: CategoriaService,
        private readonly _historialCategoriaLibroService: HistorialCategoriaLibroService) {

        this.estaEditando = false;
    }

    @Get('principal')
    async vistaAdministradorLibro(
        @Session() session, @Res() res,
        @Query('ideditar') ideditar?: number,
        @Query('stringbuscar') stringbuscar?: string,
        @Query('banderabuscar') banderabuscar?: number) {

        if (session.username) { //si es que existe la sesion significa que estamos logeados

            const categorias = await this._categoriaService.buscar(); //las categorias existentes que se van a mandar para escoger en el registro de libros

            let libros;

            if (stringbuscar) {

                libros = await this._libroService.buscarporParametro(Number(banderabuscar), stringbuscar);
                res.render('administrador/libro', { categorias, libros });

            } else { //no estoy buscando nada, quiero todos los libros


                libros = await this._libroService.buscar();

                if (ideditar != null) {
                    this.estaEditando = true;
                }

                if (!this.estaEditando) { //no esta editando

                    res.render('administrador/libro', { categorias, libros });

                } else if (this.estaEditando) { //si se esta editanto


                    if (ideditar != null) {
                        const respuestaBusquedaLibroEditar = await this._libroService.buscarporId(Number(ideditar));
                        const libroEditar = respuestaBusquedaLibroEditar[0];

                        res.render('administrador/libro', { categorias, libros, libroEditar });

                    } else {
                        this.estaEditando = false;
                    }

                }
            }

        } else {
            res.redirect('/usuario/login');
        }

    }

    @Post('registrar')
    async registrarLibro(@Res() res, @Body() libro: Libro) {
        //autenticar faltaría aquí?

        libro.edicion = Number(libro.edicion);
        libro.precio = Number(libro.precio);
        libro.estado = "Disponible";

        //AQUI FALTARIA EL DTO


        if (!this.estaEditando) {
            //registro el libro
            const respuestaLibroRegistrado = await this._libroService.registrar(libro);


            //creo la de rompimiento, aqui faltaria un forEach cuando sean multiples categorias (creo)
            const entidadHistorialCategoria: HistorialCategoriaLibro = {
                fkLibro: respuestaLibroRegistrado.id,
                fkCategoria: libro.categoria
            }

            //registro la de rompimiento
            this._historialCategoriaLibroService.registrarHistorialCategoria(entidadHistorialCategoria);

            res.redirect('/libro/principal');

        } else { //ESTOY EDITANDO
            const respuestaLibroEditado = await this._libroService.editarLibro(libro.id, libro);
            this.estaEditando = false;
            res.redirect('/libro/principal');
        }


    }

    @Post('estado')
    async cambiarEstadoLibro(
        @Body('id') id: number,
        @Body('estado') estado: string,
        @Res() res
    ) {

        await this._libroService.cambiarEstado(Number(id), estado);

        res.redirect('/libro/principal');

    }




}