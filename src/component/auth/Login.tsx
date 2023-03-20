import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {SyntheticEvent, useState} from 'react';
import Paper from '@mui/material/Paper';
import {AppConstants} from "../../constant/AppConstants";
import {useDispatch} from "react-redux";
import {UserModel} from "../../models/UserModel";

import {login} from "../../actions/auth.action";




const theme = createTheme();

export default function LogInScreen() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [user,setUser]=useState<UserModel>({username:'',password:''});
    const [error,setError]=useState({usernameError:'',passwordError:''});

    const submitHandler = (event:SyntheticEvent) => {
        event.preventDefault();
        if(!user.username&&!user.password){
            setError({usernameError: 'username required',passwordError: 'password required'});
        }
        else if(!user.username){
            setError({usernameError: 'username required',passwordError: ''});
        }
        else if(!user.password){
            setError({usernameError: '',passwordError: 'password required'});
        }
        else {
            dispatch( login(user,
                ()=>{
                    navigate(AppConstants.welcomeRoute);
                },
                ()=>{
                    setError({usernameError:'invalid username/password',passwordError:'invalid username/password'});
                }
            ));
        };
    }

    const userUpdateHandler=(event:SyntheticEvent)=>{
        const field = (event.target as HTMLInputElement).name;
        const value = (event.target as HTMLInputElement).value;
        setUser({...user,[field]:value});

    }


    return (
        <ThemeProvider theme={theme}>
            <Grid container className={'center-content'} component="main" sx={{ height: '94.5vh' }}>

    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    <Box
        sx={{
        my: 6,
            mx: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
    }}
>
    <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
    <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
        Sign in
        </Typography>

                <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1 ,width:'100%'}}>
                    <TextField
                        margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={user.username}
                    onChange={userUpdateHandler}
                    autoFocus
                    />
                    <p className="text-danger">{error.usernameError}</p>
                    <TextField
                        margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={userUpdateHandler}
                    />
                    <p className="text-danger">{error.passwordError}</p>
                    <Button
                        type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                    </Button>

            <Grid container>
            <Grid item xs>
            <Link to={AppConstants.forgetPassRoute}>
                Forgot password?
            </Link>
            </Grid>
                <Grid item>
                <Link to={AppConstants.registerRoute}>
                Don't have an account?
                </Link>
                </Grid>
                </Grid>
                </Box>
    </Box>
    </Grid>
    </Grid>
    </ThemeProvider>

);
}
