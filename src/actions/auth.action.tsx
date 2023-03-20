import axios, { AxiosPromise } from "axios";
import {UserModel} from "../models/UserModel";
import {AppConstants} from "../constant/AppConstants";
import {ActionModel, ActionObject} from "../models/ActionModel";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export const login=(user:UserModel,succeed:()=>void,failed:()=>void):ActionObject<AxiosPromise<{success:boolean,user:UserModel}>> =>{
    const loginPromise=axios.post(`${process.env.REACT_APP_API}/login`,qs.stringify(user),{withCredentials:true});
    loginPromise
        .then((res)=>{res.data.success?succeed():failed()})
        .catch(()=>{failed()});

    return{
        type:AppConstants.LOGIN,
        payload:loginPromise
    }
}
export const register=(newUser:UserModel,succeed:()=>void,failed:()=>void):ActionModel=>{
    const registerPromise=axios.post(`${process.env.REACT_APP_API}/users`,newUser);
    registerPromise
        .then((res)=>{res.data.success?succeed():failed()})
        .catch(()=>{failed()})
    return{
        type:AppConstants.REGISTER,
        payload:registerPromise
    }
}

export const logOut=()=>{
    const logOutPromise=axios.get(`${process.env.REACT_APP_API}/logout`,{withCredentials:true});

    return {
        type:AppConstants.LOGOUT,
        payload:logOutPromise
    }
}
export const checkLogIn=()=>{
    const checkLogPromise=axios.get(`${process.env.REACT_APP_API}/checklogin`,{withCredentials:true});
    return {
        type:AppConstants.CHECK_LOGIN,
        payload:checkLogPromise
    }
}
export const changePass=(changedUser:UserModel)=>{
    const changePassPromise=axios.post(`${process.env.REACT_APP_API}/changePass`,changedUser,{withCredentials:true});
    changePassPromise
        .then(()=>{
            useDispatch()(logOut());
            useNavigate()(AppConstants.loginRoute);
        })
        .catch(()=>{alert('change password failed')});
    return {
        type:AppConstants.LOGIN,
        payload:null
    };
}
