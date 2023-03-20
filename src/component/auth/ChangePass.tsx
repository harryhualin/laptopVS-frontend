import React, {SyntheticEvent} from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {connect} from "react-redux";
import {UserModel} from "../../models/UserModel";
import {reduxState} from "../../reducer/root.reducer";
import {bindActionCreators, Dispatch} from "redux";
import {changePass} from "../../actions/auth.action";


class ChangePassword extends React.Component<changePassProps, changePassState>{
    constructor(props:changePassProps) {
        super(props);
        this.state={
            password:'',
            passwordVerify:'',
        }
    }
    handleSubmit = (event:SyntheticEvent)=>{
        event.preventDefault();
        if(this.state.password===this.state.passwordVerify)
        {
        const user={...this.props.user,password:this.state.password};
        this.props.changePassFunction(user as UserModel);
        }
        else{
            alert('passwordVerify must be same as password');
        }
    }
    updateHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        const field=(event.target as HTMLInputElement).name;
        const value=(event.target as HTMLInputElement).value;
        this.setState({...this.state,[field]:value});
    }

    render(){
        return(
            <Container component="main" style={{ background: "rgba(209, 247, 255, 1)", height: "100vh"}}>
                <CssBaseline />
                <Box
                    sx={{
                        paddingTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar variant='square' >
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={this.state.password}
                                    onChange={this.updateHandler}
                                />
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
                                    value={this.state.passwordVerify}
                                    onChange={this.updateHandler}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>
            </Container>);
    }
}
function mapStateToProps(state:reduxState){
   const user=state.user;
   return {user} as changePassProps;
}
function mapDispatchToProps(dispatch:Dispatch){
    return bindActionCreators(
        {changePassFunction:changePass},dispatch);
}
interface changePassProps{
    user:UserModel|null;
    changePassFunction:(newUser:UserModel)=>{} ;
}
interface changePassState{
    password:string;
    passwordVerify:string;
}
export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);