import { Controller, Get, Res, Post, Body, Session, Req } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./Interface/usuario";
import { LibroEntity } from "src/libro/libro.entity";
import { UsuarioCreateDto } from "./dto/usuario.create.dto";
import { validate } from "class-validator";

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly _usuarioService: UsuarioService) {

    }

    @Get('login')
    loginvista(@Res() res, @Req() req) {
        if (req.session) {
            req.session.username = undefined;
            req.session.destroy();
        }
        res.render('login', {});
    }

    @Get('registrar')
    registrarUsuarioVista(@Res() res) {
        res.render('usuarioregistro', {});
    }

    @Post('registrar')
    async registrarUser(@Res() res, @Body() user: Usuario) {

        user.cedula = Number(user.cedula);
        user.fkTipoUsuario = Number(user.fkTipoUsuario);

        //class validator
        //para la validacion con CLASS VALIDATOR
        let usuarioAValidar = new UsuarioCreateDto();
        usuarioAValidar.fkTipoUsuario = user.fkTipoUsuario;
        usuarioAValidar.usuario = user.usuario;
        usuarioAValidar.contrasenia = user.contrasenia;
        usuarioAValidar.nombre = user.nombre;
        usuarioAValidar.apellido = user.apellido;
        usuarioAValidar.cedula = user.cedula;


        try {

            const errores = await validate(usuarioAValidar);


            if (errores.length > 0) {//Errores en la validacion
                console.error(errores);

                //res.redirect('/api/dieguito/crearvista?mensaje=hay_un_error');
                //manejar el error
            } else {

                const respuestaUsuarioRegistrado = await this._usuarioService.registrarUsuario(user);
                res.redirect('/usuario/login');

            }

        } catch (e) {
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });

        }

    }


    @Post('login')
    async login(@Res() res, @Body() usuario, @Req() req) {

        try {
            const respuestaAutenticacion = await this._usuarioService.buscarUsuario(usuario.username, usuario.password);

            const userAAutenticar = respuestaAutenticacion[0];

            if (userAAutenticar) {
                req.session.username = usuario.username;
                req.session.password = usuario.password;

                if (userAAutenticar.fkTipoUsuarioId == 1) { //si es admin

                    res.redirect('/libro/principal');

                } else { //se iria a la vista del cliente
                    req.session.carrito = [];
                    req.session.comprando = false;
                    res.redirect('/libro/catalogo');
                }

            } else {
                res.status(400);
                res.send({ mensaje: 'Error login, datos incorrectos', error: 400 });
            }

        } catch (e) {
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }

    }

    @Get('logout')
    logout(
        @Res() res,
        @Req() req,
    ) {
        if (req.session) {
            req.session.username = undefined;
            req.session.destroy();
            res.redirect('/usuario/login');
        }
    }

}