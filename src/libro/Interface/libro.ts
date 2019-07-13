export interface Libro {
  id?: number;
  isbn: string;
  titulo: string;
  autor: string;
  edicion: number;
  editorial: string;
  precio: number;
  estado: string;


  categoria1?:string;
  categoria2?:string;
  categoria3?:string;
  categoria4?:string;
  categoria5?:string;

  //Para el carrito
  cantidad?:number;
}