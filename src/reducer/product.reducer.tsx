import {ProductModel} from "../models/ProductModel";
import {ActionModel} from "../models/ActionModel";
import {AppConstants} from "../constant/AppConstants";


export const productsReducer=(state:ProductModel[]=[], action:ActionModel)=>{
    switch(action.type){
        case AppConstants.GET_PRODUCTS:
            return action.payload.data.dataList;
        default:
            return state;
    }


}
