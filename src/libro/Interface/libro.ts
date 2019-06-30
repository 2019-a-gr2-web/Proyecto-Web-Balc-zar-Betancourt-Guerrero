export interface Libro {
  id?: number;
  isbn: string;
  titulo: string;
  autor: string;
  edicion: number;
  editorial: string;
  precio: number;
  estado: boolean;
}