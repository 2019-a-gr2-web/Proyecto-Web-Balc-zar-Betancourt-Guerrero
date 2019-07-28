import { Controller, Get, Res, Session, Catch, Req } from "@nestjs/common";
import { FacturaService } from "./factura.service";
import { LibroService } from "../libro/libro.service";

@Controller('factura')
export class FacturaController {

    constructor(private readonly _serviceFactura: FacturaService,
        private readonly _serviceLibro: LibroService) {

    }

    @Get('facturas')
    async facturasDeUsuario(
        @Res() res,
        @Req() req) {

        try {

            if (req.session.username) {

                const fk_usuario: number = Number(req.session.user.id);
                const facturas = await this._serviceFactura.devolverFacturaSegunUsuario(fk_usuario);
                const libros = await this._serviceLibro.obtenerLibrosPorFactura();
                const nombreCompletoUsuario = req.session.user.nombre + " " + req.session.user.apellido;
                res.render('cliente/facturas', { facturas, libros, nombreCompletoUsuario });
            }

        } catch (e) {
            console.log("el error: ", e);
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });

        }

    }

}