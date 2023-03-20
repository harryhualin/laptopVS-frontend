import {UserModel} from "./UserModel";
import {ProductModel} from "./ProductModel";

export interface CommentModel{
    id?:number;
    content:string;
    comment_date:Date;
    target_id:number;
    user?:UserModel;
    product?:ProductModel;

    username?:string;


}