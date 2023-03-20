import {ProductModel} from "./ProductModel";


export interface SavedProductModel{
    id?:number;
    userId:number;
    product:ProductModel;

}