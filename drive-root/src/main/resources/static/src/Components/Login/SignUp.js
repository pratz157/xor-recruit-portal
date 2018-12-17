import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBAlert } from 'mdbreact';
import axios from 'axios';
import AppUrls from '../../service.config';

class SignUp extends Component{

  constructor(props){
    super(props);
        this.state={
          role:'',
          // skills:{
          //     id:'',
          //     skill:''
          // },
          skill:'',
          email:'',
          password:'',
          passcode:'',
          error:false,
          errorMsg:''
        }
  }

  // onClick = (nr) => {
  //   this.setState({
  //     role: nr
  //   });
  // }
  handleChange = (val,id) => {
        
    this.setState({
      ...this.state,
       [id]:val
    });
}

  handleSkill = (e) => {
    console.log("[SignUP skill ] -- ",e.target.value);
    this.setState({
        skill: e.target.value
    });
}

validateEmail = (emailField =this.state.email) =>{
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(emailField) === false) 
  {
      // alert('Invalid Email Address');
      return false;
  }
  return true;
}

registerPanel = () =>{
  if(this.validateEmail()){
    if(this.state.password !== this.state.passcode){
      this.setState({
        error: true,
        errorMsg:'Passwords did not match'
      });
    }
    else{
      let req = {
        "password": this.state.password,
        "role": "Panel",
        "emailId": this.state.email,
        "skill":this.state.skill
      }
      axios.post(AppUrls.login.signup,req).then((res)=>{
        // res.data.role='Panel';
        // this.props.clicked(res.data); 

      }).catch((err)=>{
        console.log("[ERROR] - ",err);
      })
    }

  }
  else{
    this.setState({
      error: true,
      errorMsg:'Enter a valid Email ID'
    });
  }

}

  render(){
    return (
      <MDBContainer className="mt-5" style={{minHeight: '100vh'}}>
        <MDBRow >
          <MDBCol xs="12" sm="9" md="8" lg="8">
            <MDBCard>
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4">Panelist Sign up</p>
                  <div className="grey-text">
                    {/* <MDBInput
                      label="Xoriant ID"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                    /> */}
                    <MDBInput
                      label="Xoriant email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      getValue={(e)=>this.handleChange(e,'email')} 
                    />
                  {this.state.error ? <MDBAlert color="danger" dismiss onClosed={()=> this.setState({error:false})}>
                                                        {this.state.errorMsg}
                                      </MDBAlert>: null}  
                    
                    {/* <div style={{display: '-webkit-inline-box'}}>
                      <Input
                        gap
                        onClick={() => this.onClick(1)}
                        checked={this.state.role === 1 ? true : false}
                        label="HR Admin"
                        type="radio"
                        id="hr"
                      />
                      
                      <Input
                        gap
                        onClick={() => this.onClick(2)}
                        checked={this.state.role === 2 ? true : false}
                        label="Technical/Panel"
                        type="radio"
                        id="panel"
                      />
                    </div> */}

                    <select className="browser-default custom-select"  value={this.state.skill} onChange={(e)=>this.handleSkill(e)}>
                        {this.props.skillMatrix.map(s =>
                            <option id={s.id} key={s.id} value={s.skill}>{s.skill}</option>
                        )}
                    </select>

                    <MDBInput
                      label="Your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      getValue={(e)=>this.handleChange(e,'password')}
                    />
                    <MDBInput
                      label="Confirm your password"
                      icon="exclamation-triangle"
                      group
                      type="password"
                      validate
                      error="wrong"
                      success="right"
                      getValue={(e)=>this.handleChange(e,'passcode')}
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="danger" type="button" onClick={()=>{this.registerPanel()}}>
                      Register
                    </MDBBtn>
                  </div>
                  <p className="font-small grey-text d-flex justify-content-center">
                                      Already have an account?
                                      <span
                                          
                                          className="dark-grey-text font-weight-bold ml-1"
                                          onClick={()=>this.props.toggle('signup')}>
                                          Login
                                      </span>
                                      {/* <Button onClick={this.props.toggle}>Sign up</Button> */}
                                  </p>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
// const FormPage = (props) => {
  
// };

export default SignUp;