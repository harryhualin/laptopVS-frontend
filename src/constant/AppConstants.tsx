import {ProductModel} from "../models/ProductModel";
import React from "react";

export const AppConstants={
    // route path
    welcomeRoute:'/',
    productsRoute: '/products',
    addProductRoute: '/add-product',
    editProductRoute: '/edit-product',
    viewProductRoute:'/product',
    compareRoute:'/compare',


    profileRoute:'/profile',
    registerRoute:'/register',
    loginRoute: '/login',
    forgetPassRoute:'/forget-password',
    changePassRoute:'/change-password',
    resetPassRoute:'/reset-password',



    // actions type
    GET_PRODUCTS: 'GET_PRODUCTS',
    ADD_PRODUCT: 'ADD_PRODUCT',
    GET_PRODUCT_BY_ID:'GET_PRODUCT_BY_ID',
    GET_RATE_FOR_PRODUCT:'GET_RATE_FOR_PRODUCT',
    RATE_A_PRODUCT:"RATE_PRODUCT",

    GET_SAVED_PRODUCTS:"GET_SAVED_PRODUCTS",
    RESET_SAVED_PRODUCTS:"RESET_SAVED_PRODUCTS",
    ADD_SAVED_PRODUCT:'ADD_SAVED_PRODUCT',
    REMOVE_SAVED_PRODUCT:"REMOVED_SAVED_PRODUCT",   // in viewProduct page and unlike a product
    DELETE_SAVED_PRODUCT:"DELETE_SAVED_PRODUCT",   /// in profile page and delete one savedProduct
    CHECK_IF_SAVED:"CHECK_IF_SAVED",

    ADD_COMMENT:'ADD_COMMENT',
    GET_COMMENTS:'GET_COMMENTS',
    RESET_COMMENTS:"RESET_COMMENTS",

    LOGIN: 'LOGIN',
    REGISTER:'REGISTER',
    CHECK_LOGIN: 'CHECK_LOGIN',
    LOGOUT: 'LOGOUT',
    FORGET_PASSWORD:'FORGET_PASSWORD',
    CHANGE_PASSWORD:'CHANGE_PASSWORD',
    RESET_PASSWORD:'RESET_PASSWORD',

    GET_USERS:'GET_USERS',
    GET_USER_BY_ID:'GET_USER_BY_ID',

    LAPTOP_BRANDS:['Mac','Dell','Asus','Lenovo'],


    PRODUCT_CONFIG_FIELDS:[
    {   label:'Brand',
        id:'brand',
        type:'text'
    },
    {   label:'Name',
        id:'name',
        type:'text'
    },
    {   label:'Processor',
        id:'processor',
        type:'text'
    },
    {   label:'OperatingSystem',
        id:'operating_system',
        type:'text'
    },

    {   label:'Graphics',
        id:'graphics',
        type:'text'
    },
    {   label:'Memory',
        id:'memory',
        type:'text'
    },
    {   label:'Storage',
        id:'storage',
        type:'text'
    },
    {   label:'Display',
        id:'display',
        type:'text'
    },
    {   label:'Camera',
        id:'camera',
        type:'text'
    }

    ],


}

interface filter {
    [key: string]: {
        [key:string]:(product:ProductModel)=>boolean
    }
}

export const PRODUCT_FILTER_CONDITIONS:filter={
    Price:{
        "less then 500": (product:ProductModel)=>{return product.price<500},
        "between 500 and 1000":(product:ProductModel)=>{return product.price>=500 && product.price<1000},
        "between 1000 and 2000":(product:ProductModel)=>{return product.price>=1000 && product.price<2000},
        "greater then 2000":(product:ProductModel)=>{return product.price>=2000}
    },
    Processor:{
        "Intel® Core™ i9":(product:ProductModel)=>{return product.processor.includes('Intel® Core™ i9')},
        "Intel® Core™ i7":(product:ProductModel)=>{return product.processor.includes('Intel® Core™ i7')},
        "Intel® Core™ i5":(product:ProductModel)=>{return product.processor.includes('Intel® Core™ i5')},
        "Intel® Core™ i3":(product:ProductModel)=>{return product.processor.includes('Intel® Core™ i3')},
        "Intel® Core™ m3":(product:ProductModel)=>{return product.processor.includes('Intel® Core™ m3')},
        "AMD Ryzen™ 9":(product:ProductModel)=>{return product.processor.includes('AMD Ryzen™ 9')},
        "AMD Ryzen™ 7":(product:ProductModel)=>{return product.processor.includes('AMD Ryzen™ 7')},
        "AMD Ryzen™ 5":(product:ProductModel)=>{return product.processor.includes('AMD Ryzen™ 5')},
        "AMD Ryzen™ 3":(product:ProductModel)=>{return product.processor.includes('AMD Ryzen™ 3')}
    },
    "Screen Size":{
        "10 \" - 12.9 \"":(product:ProductModel)=>{return product.display.includes('10')||product.display.includes('11')||product.display.includes('12')},
        "13 \" - 14.9 \"":(product:ProductModel)=>{return product.display.includes('13')||product.display.includes('14')},
        "15 \" - 16.9 \"":(product:ProductModel)=>{return product.display.includes('15')||product.display.includes('16')},
        "17 \" - 18 \"":(product:ProductModel)=>{return product.display.includes('17')||product.display.includes('18')}

    },
    "Operating System":{
        "Chrome OS":(product:ProductModel)=>{return product.operating_system.toLowerCase().includes('chrome os')},
        "Windows 10 Pro":(product:ProductModel)=>{return product.operating_system.toLowerCase().includes('windows 10 pro')},
        "Windows 10 Home":(product:ProductModel)=>{return product.operating_system.toLowerCase().includes('windows 10 home')},
        "Windows 11 Pro" :(product:ProductModel)=>{return product.operating_system.toLowerCase().includes('windows 11 pro')},
        "Windows 11 Home" :(product:ProductModel)=>{return product.operating_system.toLowerCase().includes('windows 11 home')}
    },
   "Graphics":{
    "Qualcomm™ Adreno":(product:ProductModel)=>{return product.graphics.toLowerCase().includes('Qualcomm™ Adreno'.toLowerCase())},
    "Intel® Iris® Xe":(product:ProductModel)=>{return product.graphics.toLowerCase().includes('Intel® Iris® Xe'.toLowerCase())},
    "Intel® UHD":(product:ProductModel)=>{return product.graphics.toLowerCase().includes('Intel® UHD'.toLowerCase())},
   "Integrated":(product:ProductModel)=>{return product.graphics.toLowerCase().includes('Integrated'.toLowerCase())},
    "AMD":(product:ProductModel)=>{return product.graphics.toLowerCase().includes('AMD'.toLowerCase())}
},
"Memory":{
"32 GB":(product:ProductModel)=>{return product.memory.toLowerCase().includes('32 GB'.toLowerCase())},
"16 GB":(product:ProductModel)=>{return product.memory.toLowerCase().includes('16 GB'.toLowerCase())},
"8 GB":(product:ProductModel)=>{return product.memory.toLowerCase().includes('8 GB'.toLowerCase())},
"4 GB":(product:ProductModel)=>{return product.memory.toLowerCase().includes('4 GB'.toLowerCase())}
},
"Storage":{
"2 TB":(product:ProductModel)=>{return product.storage.toLowerCase().includes('2 TB'.toLowerCase())},
"1 TB":(product:ProductModel)=>{return product.storage.toLowerCase().includes('1 TB'.toLowerCase())},
"512 GB":(product:ProductModel)=>{return product.storage.toLowerCase().includes('512 GB'.toLowerCase())},
"256 GB":(product:ProductModel)=>{return product.storage.toLowerCase().includes('256 GB'.toLowerCase())},
"128 GB":(product:ProductModel)=>{return product.storage.toLowerCase().includes('128 GB'.toLowerCase())},
"64 GB":(product:ProductModel)=>{return product.storage.toLowerCase().includes('64 GB'.toLowerCase())},
"32 GB" :(product:ProductModel)=>{return product.storage.toLowerCase().includes('32 GB'.toLowerCase())}
    }
}

export const PRODUCT_SORT_COMPARATOR:{[key:string]:(a:ProductModel,b:ProductModel)=>number}={
"highest-price":(a:ProductModel,b:ProductModel)=>{return b.price-a.price},
"lowest-price":(a:ProductModel,b:ProductModel)=>{return a.price-b.price},
"most-views":(a:ProductModel,b:ProductModel)=>{return b.views-a.views},
"least-view":(a:ProductModel,b:ProductModel)=>{return a.views-b.views},
"highest-rated":(a:ProductModel,b:ProductModel)=>{return b.rate!.rate-a.rate!.rate},
"lowest-rated":(a:ProductModel,b:ProductModel)=>{return a.rate!.rate-b.rate!.rate}
}