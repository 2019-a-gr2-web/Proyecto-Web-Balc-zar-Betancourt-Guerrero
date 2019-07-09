import { Controller, Get, Res, Post, Body, Session } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./Interface/usuario";

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly _usuarioService: UsuarioService) {

    }

    @Get('login')
    loginvista(@Res() res) {
        res.render('login', {});
    }

    @Get('registrar')
    registrarUsuarioVista(@Res() res){
        res.render('usuarioregistro', {});
    }

    @Post('registrar')
    registrarUser(@Res() res,@Body() user:Usuario){

        user.cedula=Number(user.cedula);
        user.fkTipoUsuario=Number(user.fkTipoUsuario);
        //aqui faltaria el dto

        this._usuarioService.registrarUsuario(user);

        res.redirect('/usuario/login');


    }


    @Post('login')
    async login(@Res() res, @Body() usuario, @Session() session) {

        const respuestaAutenticacion = await this._usuarioService.buscarUsuario(usuario.username, usuario.password);
      
        const userAAutenticar = respuestaAutenticacion[0];
       

        if (userAAutenticar) {
            session.username = usuario.username;
            session.password = usuario.password;

            if (userAAutenticar.fkTipoUsuarioId==1) { //si es admin

                res.redirect('/libro/principal');

            }else{ //se iria a la vista del cliente
                
                res.redirect('/libro/catalogo');
            }

        } else {
            res.status(400);
            res.send({ mensaje: 'Error login, datos incorrectos', error: 400 });
        }
    }
}