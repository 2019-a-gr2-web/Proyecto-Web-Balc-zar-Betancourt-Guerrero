import { Controller, Get, Res, Post, Body, Session } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly _usuarioService: UsuarioService) {

    }

    @Get('login')
    loginvista(@Res() res) {
        res.render('login', {});
    }

    @Post('login')
    async login(@Res() res, @Body() usuario, @Session() session) {

        const respuestaAutenticacion = await this._usuarioService.buscarUsuario(usuario.username, usuario.password);


        const userAAutenticar = respuestaAutenticacion[0];
        //console.log(userAAutenticar);

        if (userAAutenticar) {
            session.username = usuario.username;
            session.password = usuario.password;

            if (usuario.fktipousuario == 1) { //si es admin
                res.redirect('/libro/principal');
            }else{
                //se iria a la vista del cliente
            }

        } else {
            res.status(400);
            res.send({ mensaje: 'Error login', error: 400 });
        }
    }
}