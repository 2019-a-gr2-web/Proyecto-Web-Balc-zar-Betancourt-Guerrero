import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CategoriaEntity } from '../categoria/categoria.entity';
import { LibroEntity } from '../libro/libro.entity';

@Entity('historialCategoriaLibro') //Podemos pasr el nombre de la tabla
export class HistorialCategoriaLibroEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne( type => LibroEntity, libro=>libro.historialCategoriaLibros)
  fkLibro?: number;

  @ManyToOne( type => CategoriaEntity, categoria=>categoria.historialCategoriaLibros)
  fkCategoria: number;

}