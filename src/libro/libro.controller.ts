import { Controller, Get, Res, Post, Body, Session, Query } from "@nestjs/common";
import { Libro } from "./Interface/libro";
import { LibroService } from "./libro.service";
import { CategoriaService } from "../categoria/categoria.service";
//import { HistorialCategoriaLibroEntity } from "../historialCategoriaLibro/historialCategoriaLibro.entity";
import { HistorialCategoriaLibro } from "../historialCategoriaLibro/Interface/historialCategoriaLibro";
import { HistorialCategoriaLibroService } from "../historialCategoriaLibro/historialCategoriaLibro.service";
import { HistorialCategoriaLibroEntity } from "../historialCategoriaLibro/historialCategoriaLibro.entity";
import { LibroEntity } from "../libro/libro.entity";
import { get } from "http";
import { LibroCreateDto } from "./dto/libro.create.dto";
import { validate } from "class-validator";


@Controller('libro')
export class LibroController {

    estaEditando: boolean = false;
    idLibroEditando: number = null;
    librosCatalogo: LibroEntity[] = [];
    conCarrito: boolean = false;

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

        try {
            if (session.username) { //si es que existe la sesion significa que estamos logeados
                let categoriasPorLibro;
                const categorias = await this._categoriaService.buscar(); //las categorias existentes que se van a mandar para escoger en el registro de libros
                this.estaEditando = false;
                let libros;

                if (stringbuscar) { //si se esta buscando
                    categoriasPorLibro = await this._libroService.obtenerCategoriasPorLibro();
                    libros = await this._libroService.buscarporParametro(Number(banderabuscar), stringbuscar);
                    res.render('administrador/libro', { categorias, libros, categoriasPorLibro });

                } else { //no estoy buscando nada en especifico, quiero todos los libros


                    libros = await this._libroService.buscar();


                    if (ideditar) { //voy a editar
                        categoriasPorLibro = await this._libroService.obtenerCategoriasPorLibro();
                        this.estaEditando = true;
                        this.idLibroEditando = Number(ideditar);

                        const respuestaBusquedaLibroEditar = await this._libroService.buscarporId(Number(ideditar));
                        const libroEditar = respuestaBusquedaLibroEditar[0];

                        res.render('administrador/libro', { categorias, libros, libroEditar, categoriasPorLibro });

                    } else { //no voy a editar
                        categoriasPorLibro = await this._libroService.obtenerCategoriasPorLibro();
                        res.render('administrador/libro', { categorias, libros, categoriasPorLibro });
                    }
                }

            } else {
                res.redirect('/usuario/login');
            }

        } catch (e) {

            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });

        }

    }

    @Post('registrar')
    async registrarLibro(@Res() res, @Body() libro: Libro) {
        try {
            //autenticar faltaría aquí??

            libro.edicion = Number(libro.edicion);
            libro.precio = Number(libro.precio);
            libro.estado = "Disponible";

            //aniado las categorias
            const categoriasArray: number[] = [];
            if (libro.categoria1 == "on") {
                categoriasArray.push(1);
            }
            if (libro.categoria2 == "on") {
                categoriasArray.push(2);
            }
            if (libro.categoria3 == "on") {
                categoriasArray.push(3);
            }
            if (libro.categoria4 == "on") {
                categoriasArray.push(4);
            }
            if (libro.categoria5 == "on") {
                categoriasArray.push(5);
            }


            //para la validacion con CLASS VALIDATOR
            let libroAValidar = new LibroCreateDto();
            libroAValidar.isbn = libro.isbn;
            libroAValidar.titulo = libro.titulo;
            libroAValidar.autor = libro.autor;
            libroAValidar.edicion = libro.edicion;
            libroAValidar.editorial = libro.editorial;
            libroAValidar.precio = libro.precio;
            libroAValidar.estado = libro.estado;

            const errores = await validate(libroAValidar);


            if (errores.length > 0) {//Errores en la validacion
                console.error(errores);
               
                //res.redirect('/api/dieguito/crearvista?mensaje=hay_un_error');
                //manejar el error
            } else {

                if (!this.estaEditando) { //SI NO SE ESTA EDITANDO, INSERTA

                    this.estaEditando = false;
                    //registro el libro
                    const respuestaLibroRegistrado = await this._libroService.registrar(libro);

                    //registro las de rompimiento (si hay muchas categorias)
                    categoriasArray.forEach(
                        async categoriaid => {
                            await this._historialCategoriaLibroService.registrarHistorialCategoria(respuestaLibroRegistrado.id, categoriaid);
                        }
                    )


                    res.redirect('/libro/principal');

                } else { //ESTOY EDITANDO

                    //se edita el libro
                    const respuestaLibroEditado = await this._libroService.editarLibro(this.idLibroEditando, libro);

                    this.estaEditando = false;

                    res.redirect('/libro/principal');
                }
            }

        } catch (e) {
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }

    }

    @Post('estado')
    async cambiarEstadoLibro(
        @Body('id') id: number,
        @Body('estado') estado: string,
        @Res() res
    ) {
        try {

            const respuestaCambioEstado = await Promise.all([this._libroService.cambiarEstado(Number(id), estado)]);
            res.redirect('/libro/principal');

        } catch (e) {

            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });

        }

    }




    /*----------------CLIENTE----------------*/



    @Get('catalogo')
    async catalogoCliente(
        @Res() res,
        @Session() session
    ) {
        try {
            if (session.username) { //loggeado

                const categoriasPorLibro = await this._libroService.obtenerCategoriasPorLibro();

                if (session.comprando == true) {
                    res.render('cliente/catalogo', { libros: this.librosCatalogo, categoriasPorLibro: categoriasPorLibro });
                } else {
                    this.librosCatalogo = await this._libroService.buscar();
                    res.render('cliente/catalogo', { libros: this.librosCatalogo, categoriasPorLibro: categoriasPorLibro });
                }


            }
        } catch (e) {
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }

    }

    @Post('agregarcarrito')
    agregarCarrito(
        @Res() res,
        @Body('idLibro') idLibro: number,
        @Body('cantidad') cantidad: number,
        @Session() session) {
        try {
            console.log("id del libro: ", idLibro);

            if (session.username) {
                session.comprando = true;
                const index = this.librosCatalogo.findIndex(
                    value => {
                        return value.id == Number(idLibro);
                    }
                );

                this.librosCatalogo.forEach(
                    libro => {
                        if (libro.id == Number(idLibro)) {
                            const libroAux: Libro = libro
                            libroAux.cantidad = Number(cantidad);
                            session.carrito.push(libroAux);
                        }
                    }
                )

                /*const libroAuxiliar: Libro = this.librosCatalogo[index] as Libro;
                libroAuxiliar.cantidad = Number(cantidad);
                session.carrito.push(libroAuxiliar);
    
                this.librosCatalogo.splice(index, 1);*/



                res.redirect('/libro/catalogo');

            }
        } catch (e) {
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }

    }


    // Carrito Cliente

    @Get('carrito')
    async carritoDeCompra(@Res() res, @Session() session) {
        try {
            if (session.username) {

                const categoriasPorLibro = await this._libroService.obtenerCategoriasPorLibro();
                const carrito: Libro[] = session.carrito as Libro[];
                const total = carrito.reduce(
                    (acumulado, libroActual) => {
                        return acumulado + (libroActual.precio * libroActual.cantidad);
                    }, 0
                );

                res.render('cliente/carritocompras', { carrito: session.carrito, categoriasPorLibro, total });

            } else {

                res.redirect('/usuario/login');

            }
        } catch (e) {
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }



    }

}