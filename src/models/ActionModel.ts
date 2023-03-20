
import {Action} from "redux";

export interface ActionModel{
    type:string;
    payload:any;
}

export interface ActionObject<p> extends Action<string>{
    payload:p;
}