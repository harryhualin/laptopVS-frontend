import {UserModel} from "../models/UserModel";
import {AppConstants} from "../constant/AppConstants";


import {AxiosResponse} from "axios";


export const userReducer = (state:UserModel|null = null, action: ActionType) => {
    switch (action.type) {
        case AppConstants.LOGIN:
            return action.payload.data.success ? action.payload.data.user : null;
        case AppConstants.CHECK_LOGIN:

            return action.payload.data.success? action.payload.data.user : null;
        case AppConstants.LOGOUT:
            return action.payload.data.success? null : state;
        default:
            return state;
    }
};

interface ActionType {
    type: string;
    payload: AxiosResponse<{ success: boolean, user?: {} }>;
}
