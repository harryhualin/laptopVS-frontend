import {ActionModel} from "../models/ActionModel";
import {AppConstants} from "../constant/AppConstants";
import {ProductModel} from "../models/ProductModel";

export const viewProductReducer=(state:ProductModel|null=null,action:ActionModel)=>{
    switch(action.type){
        case AppConstants.GET_PRODUCT_BY_ID:
            return action.payload?action.payload.data.dataList[0]:null;
        case AppConstants.GET_RATE_FOR_PRODUCT:
            return action.payload?{...state,rate:action.payload.data.dataList[0]}:null;
        case AppConstants.RATE_A_PRODUCT:
            return {...state,rate:action.payload.data.dataList[0]};
        case AppConstants.CHECK_IF_SAVED:
            return {...state,isSaved:action.payload.data.success};
        case AppConstants.ADD_SAVED_PRODUCT:
            return {...state,isSaved:action.payload.data.success};
        case AppConstants.REMOVE_SAVED_PRODUCT:
            return {...state,isSaved:!action.payload.data.success};

        default:
            return state;

    }
}