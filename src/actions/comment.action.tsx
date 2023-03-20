import {AppConstants} from "../constant/AppConstants";
import axios from "axios";
import {CommentModel} from "../models/CommentModel";


export const getCommentsByProductId=(id:number)=>{
    const getCommentsPromise=axios.get(`${process.env.REACT_APP_API}/comments/${id}`);
    return{
        type:AppConstants.GET_COMMENTS,
        payload:getCommentsPromise
    }

}

export const addComment=(comment:CommentModel)=>{
    const addCommentPromise=axios.post(`${process.env.REACT_APP_API}/comments`,comment);
    return{
        type:AppConstants.ADD_COMMENT,
        payload:addCommentPromise
    }
}