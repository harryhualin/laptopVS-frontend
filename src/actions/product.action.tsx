
import axios from "axios";
import {AppConstants} from "../constant/AppConstants";
import {RateModel} from "../models/RateModel";
import {ProductModel} from "../models/ProductModel";
import {AddProductState} from "../component/product/AddProduct";
export const getProducts=()=>{
    const getProductsPromise = axios.get(`${process.env.REACT_APP_API}/products`);
    return {
        type:AppConstants.GET_PRODUCTS,
        payload:getProductsPromise
    }
}
export const getProductById=(id:number,userId:number=0)=>{
    const getProductPromise =axios.get(`${process.env.REACT_APP_API}/products/${id}/${userId}`);
    return{
        type:AppConstants.GET_PRODUCT_BY_ID,
        payload:getProductPromise
    }
}



export const getProductRate=(productId:number,userId:number=0)=>{
    const getProductRatePromise=axios.get(`${process.env.REACT_APP_API}/rate/${productId}/${userId}`);

    return{
        type:AppConstants.GET_RATE_FOR_PRODUCT,
        payload:getProductRatePromise
    }
}
export const rateProduct=(newRate:RateModel)=>{
    const rateProductPromise=axios.post(`${process.env.REACT_APP_API}/rate`,newRate,{withCredentials:true});

    return {
        type:AppConstants.RATE_A_PRODUCT,
        payload:rateProductPromise
    }
}

export const addProduct=(newProduct:AddProductState)=>{
    const addProductPromise=axios.post(`${process.env.REACT_APP_API}/products`,newProduct,{withCredentials:true});
    addProductPromise.then((res)=>{ console.log(res.data)})
        .catch(()=>{console.log('add product failed');});
    return {
        type:AppConstants.ADD_PRODUCT,
        payload:null
    }
}

