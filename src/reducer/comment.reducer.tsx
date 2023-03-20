import {ActionModel} from "../models/ActionModel";
import {AppConstants} from "../constant/AppConstants";
import {CommentModel} from "../models/CommentModel";

export const commentsReducer=(state:CommentModel[]=[],action:ActionModel)=>{
    switch(action.type) {
        case AppConstants.GET_COMMENTS:
            return action.payload?action.payload.data.dataList:[];
        case AppConstants.ADD_COMMENT:
            return [...state,action.payload.data.dataList[0]];
        default:
            return state;
    }
}