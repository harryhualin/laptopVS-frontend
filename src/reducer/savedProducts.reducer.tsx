import {ActionModel} from "../models/ActionModel";
import {AppConstants} from "../constant/AppConstants";
import {SavedProductModel} from "../models/SavedProduct";

export const savedProductsReducer=(state:SavedProductModel[]=[],action:ActionModel)=>{

    switch(action.type){
        case AppConstants.GET_SAVED_PRODUCTS:
            return action.payload.data.dataList;
        case AppConstants.ADD_SAVED_PRODUCT:
            return [...state,action.payload.data.dataList[0]];
        case AppConstants.DELETE_SAVED_PRODUCT:
            if(action.payload&&action.payload.data) {
                const target=action.payload.data.dataList[0];
                const index=state.findIndex((item)=>target.id===item.id);
                const newState=[...state];
                newState.splice(index,1);
                return newState;
            }
            return state;
        case AppConstants.RESET_SAVED_PRODUCTS:
            return [];
        default:
            return state;
    }
}