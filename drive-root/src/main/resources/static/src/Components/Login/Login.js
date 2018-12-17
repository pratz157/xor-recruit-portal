import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput ,MDBAlert,Modal,ModalBody} from 'mdbreact';
import axios from "axios";
import AppUrls from '../../service.config';
// import SignUp from './SignUp';
// import LandingPage from '../LandingPage/LandingPage';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CandidateStatus from '../../Containers/Candidate/CandidateStatus';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import './Login.css';

const styles = {
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
  };
  
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
  
  

class FormPage extends Component {

    constructor(props){
        super(props);
        this.state={
            login:{
                email:"",
                password:"",
            },
            candidateMail:'',
            cdStatusW:false,
            open: false,
            error:false,
            cErr:false,
            errorMsg:'',
            loading:false,
            candidateLogin:false
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

      closeCandidateWindow=()=>{
        this.setState({ cdStatusW: false });
      }

      getCandidateEmail = (e) =>{
        //   if(this.validateEmail(e)){
            this.setState({
                candidateMail:e.target.value
            })
        //   }
        //   else{
        //       console.log("[Error] ",)
        //   }
          
      }

      checkCandidateStatus = () =>{
          if(this.validateEmail(this.state.candidateMail)){
            axios.get(AppUrls.candidate.candidateLogin).then((res)=>{
                //check if candidate authorised??
                this.setState({
                    open: false,
                    cdStatusW:true
    
                })
                //get candidate id
                // let goto = '/candidate-status/' + 1;
                // this.props.history.push(goto);
                
            }).catch((e)=>{
    
            })
          }
          else{
            this.setState({
                cErr: true,
                errorMsg:'Enter a valid Email ID'
            });
          }
        
      }
    

    validateForm() {

        if(this.validateEmail(this.state.login.email)){
            if(this.state.login.password === 'drive123' ){
                this.setState({
                    loading:true
                });
                axios.get(AppUrls.login.signin).then((res)=>{
                    this.setState({
                        loading:false,
                    });
                    if(this.state.login.email === 'hr@xoriant.com' ){
                        res.data.role = 'hr';
                    }
                    // res.data={
                    //     "id": 61,
                    //     "password": "password123",
                    //     "role": "Panel",
                    //     "emailId": "p1@gmail.com",
                    //     "createdAt": 1544867931701,
                    //     "updatedAt": 1544867931701,
                    //     "skill": {
                    //         "id": 1,
                    //         "skill": "Java"
                    //     }
                    // };
                    // console.log("[res] ",res.data);
                this.props.clicked(res.data); 
                // this.props.history.push('/home');
                }).catch((res)=>{
                    console.log("[ERROR] -- ",res);
                    this.setState({
                        loading:false
                    });
                })
                  
                // window.location.href = '/home';

            }
            else{
                console.log("Enter valid Pasword");
                this.setState({
                    error: true,
                    errorMsg:'Invalid Password'
                });
            }
        }
        else{
            // console.log("Enter Valid email id");
            this.setState({
                error: true,
                errorMsg:'Enter a valid Email ID'
            });
        }
    
    }

    validateEmail = (emailField =this.state.login.email) =>{
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(emailField) === false) 
        {
            // alert('Invalid Email Address');
            return false;
        }
        return true;
    }
    
    handleChange = (event,id) => {
        
        this.setState({
            login:{
                ...this.state.login,
                [id]: event  
            }
        });
    }

    render() {
        const { classes } = this.props;
      
        return (
            // <div>
            <MDBContainer className="mt-5" style={{minHeight: '100vh'}}>
           
                <MDBRow>
                    
                    <MDBCol xs="12" sm="9" md="8" lg="9">
                        <MDBCard>
                            <div className="header pt-3 grey lighten-2">
                                <MDBRow className="d-flex justify-content-start">
                                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                        Log in
                                    </h3>
                                </MDBRow>
                            </div>
                            <MDBCardBody className="mx-4 mt-4">
                                <MDBInput label="Your email" group type="email" validate getValue={(e)=>this.handleChange(e,'email')}  />
                                {/* <MDBInput label="Your email" group type="text" validate /> */}

                                {this.state.error ? <MDBAlert color="danger" dismiss onClosed={()=> this.setState({error:false})}>
                                                        {this.state.errorMsg}
                                                    </MDBAlert>: null}  
                                
                                <MDBInput
                                    label="Your password"
                                    group
                                    type="password"
                                    getValue={(e)=>this.handleChange(e,'password')}
                                    validate
                                    containerClass="mb-0"
                                />

                                {/* {this.state.loading ? <div className="loader medium"></div> : null} */}
                                <Modal isOpen={this.state.loading} centered>
                                    <ModalBody>
                                    <div className="loader medium centered"></div>
                                    </ModalBody>
                                    {/* <i class="fa fa-spinner fa-pulse fa-spin spinner"></i> */}
                                     {/* <div className="loader medium"></div> */}
                                </Modal>
                                <p className="font-small dark-grey-text font-weight-bold d-flex justify-content-end" onClick={this.handleClickOpen}>
                                    Candidate login
                                    {/* <a
                                        href="#!"
                                        className="dark-grey-text font-weight-bold ml-1">
                                        Password?
                                    </a> */}
                                </p>
                                <div className="text-center mb-4 mt-5">
                                    <MDBBtn
                                        color="danger"
                                        type="button"
                                        className="btn-block z-depth-2"
                                        // disabled={!this.validateForm()}
                                        onClick={()=>this.validateForm()}>
                                        Log in
                                    </MDBBtn>
                                </div>
                                <p className="font-small grey-text d-flex justify-content-center">
                                    Don't have an account?
                                    <span
                                        
                                        className="dark-grey-text font-weight-bold ml-1"
                                        onClick={()=>this.props.toggle('login')}>
                                        Sign up
                                    </span>
                                    {/* <Button onClick={this.props.toggle}>Sign up</Button> */}
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        >
                        <DialogTitle id="form-dialog-title">Candidate Login</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Please enter your email address that you have provided at time of application.
                            </DialogContentText>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            onChange={(ev)=>{this.getCandidateEmail(ev)}}
                            />
                            {this.state.cErr ? <MDBAlert color="danger" dismiss onClosed={()=> this.setState({error:false})}>
                                                        {this.state.errorMsg}
                                                    </MDBAlert>: null}  
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={this.checkCandidateStatus} color="primary">
                            Check your status
                            </Button>
                        </DialogActions>
                        </Dialog>
                </MDBRow>
                <Dialog
                    fullScreen
                    open={this.state.cdStatusW}
                    onClose={this.closeCandidateWindow}
                    TransitionComponent={Transition}
                    >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                        <IconButton color="inherit" onClick={this.closeCandidateWindow} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            Candidate Status
                        </Typography>
                        {/* <Button color="inherit" onClick={this.handleClose}>
                            save
                        </Button> */}
                        </Toolbar>
                    </AppBar>
                    <CandidateStatus />
                    
                </Dialog>
                {/* {this.state.candidateLogin ? <Route path="/candidate-status/:id" exact component={CandidateStatus} /> : null} */}

             {/* {this.state.authenticated ?<Route path="/home" exact component={LandingPage}/>: null} */}
            </MDBContainer>
            // </div>
        );
    }
};

// export default FormPage;
export default withStyles(styles)(withRouter(FormPage));