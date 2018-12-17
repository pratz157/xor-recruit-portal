import React,{Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { MDBRow, MDBCol } from "mdbreact";
import LandingPage from '../Components/LandingPage/LandingPage';
import Login from '../Components/Login/Login';
import SignUp from '../Components/Login/SignUp';
import AppUrls from '../service.config';

class LandingContainer extends Component{

    constructor(props){
        super(props);
        this.state={
            newUser:false,
            authenticated:false,
            skillMatrix : [],
            userRole:''

        }
    }

    componentWillMount(){
        axios.get(AppUrls.schema.panelist.skills).then((res)=>{
            console.log("[skillset] -- ",res.data);

            this.setState({
                skillMatrix:res.data,
            })
        }).catch((error)=>{
            console.log(error);
        });
    }

    authenticateUser=(e)=>{
        console.log("Verify User Login!!!!",e);

        this.setState({
            authenticated:true,
            userRole:e.role
        })
    }

    showSignUp = (e) =>{
        // console.log("Show Sign Up please ",e);
        // this.setState(prevState => ({
        //     newUser: !prevState.newUser
        //   }));

        if(e!=='login'){
            this.setState({
                newUser:false
            })
        }
        else{
            this.setState({
                newUser:true
            })
        }
        
    }

    render(){

        let bgClass = "xor__bk";
        // let bgClass = "";
        // let  toShow = this.state.newUser ? <SignUp toggle={this.showSignUp}/>: <Login clicked={this.authenticateUser} toggle={this.showSignUp}/>
        
        let toShow = (
            <MDBRow>
            <MDBCol xs="0" sm="2" md="5" lg="7"></MDBCol>
            <MDBCol xs="12" sm="10" md="7" lg="5">
                {this.state.newUser ? <SignUp toggle={this.showSignUp} skillMatrix={this.state.skillMatrix}/>: <Login clicked={this.authenticateUser} toggle={this.showSignUp}/>}
            </MDBCol>
            </MDBRow>
        )
        if(this.state.authenticated){
            bgClass = "";
            toShow = <LandingPage skillMatrix={this.state.skillMatrix} authenticated={this.state.authenticated} role={this.state.userRole} /> ;
            // toShow = <Route path="/" exact component={LandingPage}/>
        }
        return(
            <Router>
                <div className={bgClass} >
                

                {toShow}
                {/* <div > */}
                

                {/* <Route path="/" exact component={Login}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/home" exact component={LandingPage}/> */}
                {/* {this.state.authenticated ?<Route path="/home" exact component={LandingPage}/>: null} */}
                
                </div>
         </Router>
        
        )
    }
}

export default LandingContainer;