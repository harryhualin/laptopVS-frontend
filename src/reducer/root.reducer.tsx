import {combineReducers} from "redux";
import {userReducer} from "./user.reducer";
import {productsReducer} from "./product.reducer";
import {UserModel} from "../models/UserModel";
import {ProductModel} from "../models/ProductModel";
import {commentsReducer} from "./comment.reducer";
import {savedProductsReducer} from "./savedProducts.reducer";
import {viewProductReducer} from "./viewProduct.reducer"
import {CommentModel} from "../models/CommentModel";
import {SavedProductModel} from "../models/SavedProduct";

export const rootReducer=combineReducers({
    user:userReducer,
    products:productsReducer,
    comments:commentsReducer,
    savedProducts:savedProductsReducer,
    viewProduct:viewProductReducer
})

export interface reduxState{
    user:UserModel|null;
    products:ProductModel[];
    comments:CommentModel[];
    savedProducts:SavedProductModel[];
    viewProduct:ProductModel|null
}
