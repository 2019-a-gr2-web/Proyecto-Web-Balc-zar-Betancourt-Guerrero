export interface Libro {
  id?: number;
  idCategoria: number;
  idSede: number;
  isbn: string;
  titulo: string;
  autor: string;
  edicion: number;
  editorial: string;
  preciod: number;
  estado: boolean
}