import {RateModel} from "./RateModel";

export interface ProductModel {
    id:number;
    type:string;
    name:string;
    brand:string;
    views:number;
    image:string;
    source:string;
    price:number;
    processor: string;
    operating_system:string;
    graphics : string;
    memory :string;
    storage : string;
    display :string;
    camera :string;

    rate?:RateModel;
    isSaved?:boolean;
}