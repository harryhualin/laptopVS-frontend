import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import ReduxPromise from 'redux-promise';
import {rootReducer} from "./reducer/root.reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Welcome} from "./component/welcome/Welcome";
import {AppConstants} from "./constant/AppConstants";
import { Products } from './component/product/Products';
import {ViewProduct} from "./component/product/ViewProduct";
import {Profile} from "./component/profile/Profile";
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import ForgetPassword from "./component/auth/ForgetPass";
import ChangePassword from './component/auth/ChangePass';
import ResetPassword from './component/auth/ResetPass';
import AddProduct from "./component/product/AddProduct";




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const createStoreWithMiddleware=applyMiddleware(ReduxPromise)(createStore);
// @ts-ignore
root.render(
<Provider store={createStoreWithMiddleware(rootReducer)}>
        <BrowserRouter>
                <App>
                <Routes>
                        <Route path={AppConstants.welcomeRoute} element={<Welcome></Welcome>}/>
                        <Route path={`${AppConstants.productsRoute}/:sortedBy`} element={<Products></Products>}></Route>
                        <Route path={`${AppConstants.viewProductRoute}/:productId`} element={<ViewProduct/>}/>
                        <Route path={`${AppConstants.profileRoute}/:id`} element={<Profile/>}></Route>

                        <Route path={AppConstants.loginRoute} element={<Login></Login>}></Route>
                        <Route path={AppConstants.registerRoute} element={<Register></Register>}></Route>
                        <Route path={AppConstants.forgetPassRoute} element={<ForgetPassword/>}></Route>
                        <Route path={`${AppConstants.changePassRoute}/:username`} element={<ChangePassword/>}></Route>
                        <Route path={`${AppConstants.resetPassRoute}/:email/:hashedPass`} element={<ResetPassword/>}></Route>

                        <Route path={`${AppConstants.addProductRoute}`} element={<AddProduct/>}></Route>

                </Routes>
                </App>
        </BrowserRouter>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

