import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import { withRouter } from 'react-router-dom';

// import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const drive ={
  id:'UI22d2018',
  scheduledAt:'Dec-22-2018',
  skill:'UI'
};

const FeaturesPage = (props) => {
    // console.log("[cardtwo]  ",props);
    const { classes } = props;
    // const bull = <span className={classes.bullet}>•</span>;
  return (
    <div>
    <MDBContainer className="mt-5">
      <h2 className="h1-responsive font-weight-bold text-center my-5">
        Schedule New Drive?
      </h2>
      <p className="lead grey-text w-responsive text-center mx-auto mb-5">
        Select from the following options tailored as per the skillsets.
      </p>

      <MDBRow>
        <MDBCol md="3" className="md-0 mb-5">
          <MDBRow>
            <MDBCol lg="2" md="3" size="2">
              <MDBIcon icon="code" size="2x" className="orange-text" />
            </MDBCol>
            <MDBCol lg="10" md="9" size="10">
              <h4 className="font-weight-bold">UI</h4>
              <p className="grey-text">
                 Angular, React, Vue, HTML, CSS, Bootstrap.
              </p>
              <MDBBtn color="warning" size="sm" onClick={()=>props.history.push('/drive?UI')}>
                Setup drive
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md="3" className="md-0 mb-5">
          <MDBRow>
            <MDBCol lg="2" md="3" size="2">
              <MDBIcon icon="cogs" size="2x" className="pink-text" />
            </MDBCol>
            <MDBCol lg="10" md="9" size="10">
              <h4 className="font-weight-bold">Java</h4>
              <p className="grey-text">
                Java , JSF, Wicket, GWT, Spring MVC.
              </p>
              <MDBBtn color="pink" size="sm" onClick={()=>props.history.push('drive?Java')}>
                Setup drive
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md="3" className="md-0 mb-5">
          <MDBRow>
            <MDBCol lg="2" md="3" size="2">
              <MDBIcon icon="dashboard" size="2x" className="purple-text" />
            </MDBCol>
            <MDBCol lg="10" md="9" size="10">
              <h4 className="font-weight-bold">Testing</h4>
              <p className="grey-text">
                Selenium Automation, UFT API Testing.
              </p>
              <MDBBtn color="purple" size="sm" onClick={()=>props.history.push('drive?QA')}>
                Setup drive
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md="3" className="md-0 mb-5">
          <MDBRow>
            <MDBCol lg="2" md="3" size="2">
              <MDBIcon icon="mixcloud" size="2x" className="blue-text" />
            </MDBCol>
            <MDBCol lg="10" md="9" size="10">
              <h4 className="font-weight-bold">DevOps</h4>
              <p className="grey-text">
                 Azure,AWS,and other cloud technologies.
              </p>
              <MDBBtn color="primary" size="sm" onClick={()=>props.history.push('drive?Devops')}>
                Setup drive
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <hr />
      <Typography component="h1" className="mt-3">
          Schedule Drives :
         
        </Typography>
      <br />
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {drive.scheduledAt}
        </Typography>
        <Typography variant="h5" component="h2">
          {drive.skill} {'  Drive'}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {drive.id}
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>props.history.push('/drive-candidate-list/UI22d2018')}>Go to drive</Button>
      </CardActions>
    </Card>
    </MDBContainer>
    </div>
  );
}

export default  withStyles(styles)(withRouter(FeaturesPage));