import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { TipoUsuarioEntity } from './tipoUsuario/tipoUsuario.entity';
import { TipoUsuarioModule } from './tipoUsuario/tipoUsuario.module';
import { LibroModule } from './libro/libro.module';
import { HistorialCategoriaLibroModule } from './historialCategoriaLibro/historialCategoriaLibro.module';
import { LibroEntity } from './libro/libro.entity';
import { HistorialCategoriaLibroEntity } from './historialCategoriaLibro/historialCategoriaLibro.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { CategoriaEntity } from './categoria/categoria.entity';
import { FacturaModule } from './factura/factura.module';
import { FacturaEntity } from './factura/factura.entity';
import { DetalleEntity } from './detalle/detalle.entity';
import { DetalleModule } from './detalle/detalle.module';


@Module({
  imports: [
    UsuarioModule, 
    TipoUsuarioModule, 
    LibroModule, 
    HistorialCategoriaLibroModule,
    CategoriaModule,
    FacturaModule,
    DetalleModule,
    TypeOrmModule.forRoot({
      name: 'default',//nombre de cadena de conexión por defecto del TypeORM
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'libreria',
      entities: [
        UsuarioEntity, 
        TipoUsuarioEntity, 
        LibroEntity, 
        HistorialCategoriaLibroEntity,
        CategoriaEntity,
        FacturaEntity,
        DetalleEntity
      ],
      synchronize: true, //hace que se creen las tablas y se mdoifican los datos

      insecureAuth: true,

      //dropSchema: true //borra todos los datos

    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
