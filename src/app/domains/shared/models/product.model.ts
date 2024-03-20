export interface Product{
  id: number;
  title : string;
  description : string;
  category : Category;
  price : number;
  images : string[];
  creationAt : string;
}

export interface Category{
  id:number;
  name: string;
  image: string;
}
