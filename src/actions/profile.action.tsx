import {ProductModel} from "../models/ProductModel";
import axios, {AxiosResponse} from "axios";
import {AppConstants} from "../constant/AppConstants";
import {savedProductsReducer} from "../reducer/savedProducts.reducer";
import {SavedProductModel} from "../models/SavedProduct";

export const addSavedProduct=(savedProduct:SavedProductModel)=>{
    const saveProductPromise=axios.post(`${process.env.REACT_APP_API}/SavedProduct`,savedProduct,{withCredentials:true});
    return{
        type:AppConstants.ADD_SAVED_PRODUCT,
        payload:saveProductPromise
    };
}

export const removeSavedProduct=(productId:number,userId:number)=>{
    const removeSavedProductPromise=axios.delete(`${process.env.REACT_APP_API}/SavedProduct/${productId}/${userId}`,{withCredentials:true});
    return {
        type:AppConstants.REMOVE_SAVED_PRODUCT,
        payload:removeSavedProductPromise
    };
}

export const deleteSavedProduct=(id:number)=>{
    const deleteSavedProductPromise=axios.delete(`${process.env.REACT_APP_API}/SavedProduct/${id}`,{withCredentials:true});
    return {
        type:AppConstants.DELETE_SAVED_PRODUCT,
        payload:deleteSavedProductPromise
    };
}

export const getSavedProducts=(userId:number)=>{
    const getSavedProductsPromise=axios.get(`${process.env.REACT_APP_API}/SavedProduct/${userId}`,{withCredentials:true});
    return {
        type:AppConstants.GET_SAVED_PRODUCTS,
        payload:getSavedProductsPromise
    };
}

export const checkIfSaved=(productId:number,userId:number=0)=>{
    const checkIfSavedPromise=axios.get(`${process.env.REACT_APP_API}/SavedProduct/${productId}/${userId}`,{withCredentials:true});

    return{
        type:AppConstants.CHECK_IF_SAVED,
        payload:checkIfSavedPromise
    };
}