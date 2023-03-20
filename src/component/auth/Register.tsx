import {SyntheticEvent,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import {Link, useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {UserModel} from "../../models/UserModel";
import {useDispatch} from "react-redux";
import {register} from "../../actions/auth.action";
import {AppConstants} from "../../constant/AppConstants";
import * as React from "react";
import Paper from "@mui/material/Paper";

// import ReactInputVerificationCode from "react-input-verification-code";

export default function Register() {
    const [newUser,setNewUSer]=useState<UserModel>({email_address: "", password:"", username: ""});
    const [passwordVerify,setPassWordVerify]=useState("");
    const [error,setError]=useState({email_address:'',username:'',password:'',passwordVerify:''})
    // const [value, setValue] = useState("");
    // const verifyEmail=(event:SyntheticEvent)=>{
    //     event.preventDefault();
    //     event.stopPropagation();
    // }
    // const clearValue = () => setValue("");

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit = (event:SyntheticEvent) => {
        event.preventDefault();
        let newError={...error};
        Object.keys(newUser)
            .map((key)=>{
                if(!newUser[key as keyof typeof newUser])
                {   newError[key as keyof typeof newError]=`${key} is required`;
                }
            });
        if(!passwordVerify){newError.passwordVerify="passwordVerify is required";}
        else if(passwordVerify!==newUser.password) {newError.passwordVerify="passwordVerify must be same as password";}
        setError(newError);

        if(newUser.email_address&&newUser.username&&newUser.password&&passwordVerify)
        {dispatch(register(newUser,
            ()=>{
                navigate(AppConstants.loginRoute);
            },
            ()=>{
                alert('username already be used');
            }
            ));
        }

    }
    const userUpdateHandler=(event:SyntheticEvent)=>{
        const field=(event.target as HTMLInputElement).name;
        const value=(event.target as HTMLInputElement).value;
        setNewUSer({...newUser,[field]:value});
    }

    return (


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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email_address"
                                autoComplete="email"
                                value={newUser.email_address}
                                onChange={userUpdateHandler}

                            />
                            <p className="text-danger">{error.email_address}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                value={newUser.username}
                                onChange={userUpdateHandler}
                            />
                            <p className="text-danger">{error.username}</p>
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <Button onClick={verifyEmail} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Verif Email</Button>*/}
                        {/*    <Box display="flex">*/}
                        {/*        <ReactInputVerificationCode onChange={setValue} value={value} />*/}
                        {/*        <Button onClick={clearValue}>Clear</Button> */}
                        {/*    </Box>*/}
                        {/*</Grid>*/}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={newUser.password}
                                onChange={userUpdateHandler}
                            />
                            <p className="text-danger">{error.password}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="passwordVerify"
                                label="Password Verify"
                                type="password"
                                id="passwordVerify"
                                autoComplete="new-password"
                                value={passwordVerify}
                                onChange={(e)=>{setPassWordVerify(e.target.value)}}
                            />
                            <p className="text-danger">{error.passwordVerify}</p>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login/">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            </Grid>
            </Grid>

    );
}