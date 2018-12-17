import React, {Component} from "react";
import { MDBInput,MDBContainer,MDBBtn,FormInline,MDBCol,MDBRow, MDBCard, MDBCardBody} from "mdbreact";
import { withRouter } from 'react-router-dom';
// import axios from 'axios';
// import AppUrls from '../../service.config';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
      width: '90%',
    },
    backButton: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
  });

class EnrollForm extends Component{

    constructor(props){
        super(props);
        console.log("[enroll ] = ",this.props.ppp);
        this.state = {
            candidateList : [],
            // skillMatrix : [],
            role: '0',
            skill:'',
            open:false,
            email:'',
            name:'',
            driveid:'',
            msg:''
            // skills:{
            //     id:'',
            //     skill:''
            // }
        }
    }

    // componentWillMount(){
    //     axios.get(AppUrls.schema.panelist.skills).then((res)=>{
    //         console.log("[skillset] -- ",res.data);
    //         this.setState({
    //             skillMatrix:res.data
    //         })
    //     }).catch((error)=>{
    //         console.log(error);
    //     });
    // }
    
    handleRoleChange(event) {
        this.setState({
            role:event.target.value
        });
      }
    
    onClick = (e) => {
        console.log("[Add Candidate ] -- ",e.target.value);
        this.setState({
            skill: e.target.value
        });
    }

    handleChange = (val,id) => {
        
        this.setState({
          ...this.state,
           [id]:val
        });
    }

    handleClick = () => {
        this.setState({ open: true });
      };
    
      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
      };
   

    validateForm = ()=>{
        if(this.state.name.length>0 && this.state.driveid.length>0 && this.validateEmail() ){
            this.setState({
                open:true,
                msg:'Candidate Added!!'
            });
            setTimeout(() => {
                this.props.history.replace('/home');
         }, 3300);
        }
        else{
            this.setState({
                open:true,
                msg:'Something went wrong!!'
            });
        }
        
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
    // const EnrollForm = (this.props)=> {
    render(){
        const { classes } = this.props;

        // console.log("[enroll form] -- ",this.props.match.params);
        let fType =this.props.match.params.type;
        let panelContent = null;
        if(fType === 'panel' ){
            panelContent = (
                <div>
                    <select value={this.state.role}  className="browser-default custom-select" onChange={(e)=>this.handleRoleChange(e)}>
                        <option value="0" disabled>Select Unit</option>
                        <option value="1">HR</option>
                        <option value="2">Delivery</option>
                    </select>
                    <br /><br />
               </div>     
            )
        }
        
        return (
        <div>
        <MDBContainer>
            <MDBRow>
                <MDBCol xs="1" sm="2" md="2" lg="2"/>     
                <MDBCol xs="10" sm="8" md="8" lg="8">
                    <MDBCard className="mt-5">
                        <MDBCardBody>
                            <MDBInput label="Enter Candidate Name" getValue={(e)=>this.handleChange(e,'name')}/>
                            <MDBInput label="Candidate e-mail" type="email" getValue={(e)=>this.handleChange(e,'email')} />
                            <MDBInput label="Enter Drive ID" getValue={(e)=>this.handleChange(e,'driveid')}/>

                            <FormInline>
                                <select className="browser-default custom-select"  value={this.state.skill} onChange={(e)=>this.onClick(e)}>
                                    {this.props.skillMatrix.map(s =>
                                        <option id={s.id} key={s.id} value={s.skill}>{s.skill}</option>
                                    )}
                                </select>
                            {panelContent}
                            </FormInline>

                        {/* Role-for admin user only */}
                        {/* {fType === 'panel' ? <MDBInput label="Enter SkillID" /> :<MDBInput label="Enter Unique Id" />} */}
                        {/* {panelContent} */}
                        
                    
                            <MDBBtn className="mt-4" color="danger" type="button" onClick={()=>this.validateForm()}
                            >
                                {fType === 'panel' ? <span>Add Panelist</span> : <span>Add Candidate</span>}
                            </MDBBtn>
                        
                            </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol xs="1" sm="2" md="2" lg="2"/>     

            </MDBRow> 
        </MDBContainer>
        
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={2400}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.msg}</span>}
          action={[
            // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            //   UNDO
            // </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        </div>
        );
      }
}

export default withStyles(styles)(withRouter(EnrollForm) );

// export default withRouter(EnrollForm);