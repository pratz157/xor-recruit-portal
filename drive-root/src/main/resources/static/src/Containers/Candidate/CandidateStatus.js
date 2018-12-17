import React from 'react';
import { withRouter } from 'react-router-dom';
import { MDBInput,MDBBtn,FormInline,MDBCol,MDBRow, MDBCard, MDBCardBody} from "mdbreact";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

function getSteps() {
  return ['L1', 'L2', 'PM'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Candidate to be interviewed';
    case 1:
      return 'Cleared L1 round!';
    case 2:
      return 'Cleared L2 round!!';
    case 3:
      return 'Managerial Round!';
    default:
      return 'Unknown remarks';
  }
}

class CandidateStatus extends React.Component {
  state = {
    activeStep: 0,
    open: false,
    msg:''
  };

  componentWillMount(){
    let cId =this.props.match.params.id;
    let role =this.props.location.search.slice(1);
        //     console.log("%% -- ",fType.slice(1));
    console.log("[candidate id is -- ]" , cId, " role:",role);
  }

  handleNext = (result) => {
      if(result === 'accept'){
        this.setState(state => ({
            activeStep: state.activeStep + 1,
            msg:'Candidate proceeds to next round',
            open:true
          }));
      }
      else if(result === 'reject'){
        this.setState(state => ({
            msg:'Candidate Rejected',
            open:true
          }));
      }

      setTimeout(() => {
        this.props.location.search.slice(1) === 'panel'? this.props.history.replace('/panel'):this.props.history.replace('/home');

    //     this.setState({
    //     clicked: false
    //   })
        }, 3300);
    
    // console.log("afas",this.props.location.search.slice(1));
    // this.props.location.search.slice(1) === 'panel'? this.props.history.replace('/panel'):this.props.history.replace('/home');

  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {this.props.match.path === '/view-candidate/:id' ? 
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
                <div className={classes.instructions}>
                    <MDBRow>
                    <MDBCol xs="1" sm="2" md="2" lg="2"/>     
                    <MDBCol xs="10" sm="8" md="8" lg="8">
                        <MDBCard className="mt-5">
                            <MDBCardBody>
                            <MDBInput type="textarea" label="Comments for Candidate" rows="5" />

                            <FormInline>
                                <MDBBtn className="mt-4" color="danger" type="button" onClick={()=>this.handleNext('reject')}>
                                    Reject
                                </MDBBtn>
                                <MDBBtn className="mt-4" color="success" type="button" onClick={()=>this.handleNext('accept')}> 
                                    Accept
                                </MDBBtn>
                            </FormInline>
                                </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol xs="1" sm="2" md="2" lg="2"/>     

                    </MDBRow> 
                    
                </div>
              {this.props.location.search.slice(1) === 'panel'? null :<div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={()=>this.handleNext('accept')}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>}
            </div>
          )}
        </div>
        :              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
    }

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

CandidateStatus.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(withRouter(CandidateStatus) );
