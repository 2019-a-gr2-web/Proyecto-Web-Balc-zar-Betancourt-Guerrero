import { Controller, Get, Res } from "@nestjs/common";

@Controller('usuario')
export class UsuarioController {

    @Get('login')
    login(@Res() res) {
        res.render('login', {});
    }
}