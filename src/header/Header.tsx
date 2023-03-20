import {Link, NavLink} from "react-router-dom";
import {AppConstants} from "../constant/AppConstants";
import {SyntheticEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import {reduxState} from "../reducer/root.reducer";
import Avatar from "@mui/material/Avatar";
import {MenuItem,Menu} from '@mui/material';
import {getProducts} from "../actions/product.action";
import {checkLogIn, logOut} from "../actions/auth.action";
import changePass from "../component/auth/ChangePass";
import axios from "axios";


export const Header=()=>{
    const user=useSelector((state:reduxState)=>state.user);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getProducts());
        dispatch(checkLogIn());
    },[])
    const [anchorEl, setAnchorEl] = useState<Element|null>(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event:SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = (event:SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(null);
    };
    const logOutHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        event.stopPropagation();
        dispatch(logOut());
    }

    const loggedInMenu =
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={'menuId'}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {user?.profiles?.find((role)=>{return role.type==='ROLE_ADMIN'})?
                <MenuItem><Link to={AppConstants.addProductRoute}>add product</Link></MenuItem>:null
            }
            {/*<MenuItem><Link to={`${AppConstants.changePassRoute}/${user?.username}`}>Change Password</Link></MenuItem>*/}
            <MenuItem onClick={logOutHandler}><Link to={AppConstants.welcomeRoute}>Logout</Link></MenuItem>
        </Menu>



    return(
        <header style={{backgroundColor:'blue'}}>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <Link className="navbar-brand" to={AppConstants.welcomeRoute}>LAPTOP-VS</Link>
                <ul className="nav navbar-nav">

                </ul>
                <ul className="nav navbar-nav ms-auto">
                    {user?
                        <>
                        <li className="nav-item" >
                        <NavLink className="nav-link" to={`${AppConstants.profileRoute}/${user.id}`}>
                            <ShoppingBagOutlinedIcon style={{marginRight:'30px'}}></ShoppingBagOutlinedIcon>
                        </NavLink>
                        </li>
                        <li className="nav-item">
                            <Avatar  onClick={handleProfileMenuOpen} style={{backgroundColor:"darkgrey",border:"1px solid",borderRadius:"50%"}}>
                                {user!.username.substring(0,2)}
                            </Avatar>
                            {loggedInMenu}
                        </li>
                        </>
                        : <>
                            <li className="nav-item">
                            <NavLink className="nav-link" to={AppConstants.loginRoute}>login</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to={AppConstants.registerRoute}>register</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
}