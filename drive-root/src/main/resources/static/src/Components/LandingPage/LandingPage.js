import React,{Component, Suspense} from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Container,Dropdown, DropdownToggle, DropdownMenu,  DropdownItem,Fa } from 'mdbreact';
import { Route,withRouter,Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dashboard from './Sub/Dashboard';
// import CreateDrive from './Sub/CreateDrive';
import './LandingPage.css';
import CandidateStatus from '../../Containers/Candidate/CandidateStatus';
import ScheduleDrive from './ScheduleDrive/ScheduleDrive';
import PanelView from './PanelView/PanelView'
// import EnrollForm from '../Forms/EnrollForm';

const CreateDrive = React.lazy(()=> import('./Sub/CreateDrive'));

const EnrollForm = React.lazy(()=> import('../Forms/EnrollForm'));


class FullPageIntroWithNonFixedNavbar extends Component {
  constructor(props) {
  super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      drive:{
        id:'UI22d2018',
        scheduledAt:'Dec-22-2018',
        skill:'UI'
      }
      };

  this.onClick = this.onClick.bind(this);
}

// componentWillMount(){
//   this.setState({role:'Panel'})
// }

componentDidMount(){
    //redirect to home
    let goTo = this.props.role === 'Panel' ? '/panel':'/home';
    this.props.history.push(goTo);
    //  console.log(this.props.history);
}

onClick(){
  this.setState({
    collapse: !this.state.collapse,
  });
}

// scheduleDriveHandler = (e) =>{
//     console.log("This drive is for -- ",e);
//     this.props.history.push('/drive');
// }
render() {
    
return (
   
        // <Router>
             <div style={{minHeight: '100vh'}}>
          <Navbar color="black" dark expand="md" scrolling>
          <Container>
            <NavbarBrand href="/home">
                <img className="logoImage" src="https://www.xoriant.com/blog/wp-content/themes/piemont/img/logo.png" alt="Xoriant Corporation" />
            </NavbarBrand>
            <NavbarToggler onClick = { this.onClick } />
          <Collapse isOpen = { this.state.collapse } navbar>
            <NavbarNav right>
              <NavItem active>
                  <NavLink to="/home">Home</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink to="/drive">Drive</NavLink>
              </NavItem>
              {/* <NavItem>
                  <NavLink to="/candidate-status">Profile</NavLink>
              </NavItem> */}
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    <Fa icon="user" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-default" right>
                    {/* <DropdownItem href="/enroll/panel">Add Panelist</DropdownItem> */}
                    {/* <DropdownItem href="/enroll/candidate">Add Candidate</DropdownItem> */}
                    {/* <DropdownItem > <Link to="/enroll/panel">Add Panelist</Link> </DropdownItem> */}
                    <DropdownItem > <Link to="/enroll/candidate">Add Candidate</Link> </DropdownItem>
                    <DropdownItem href="/">Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            </NavbarNav>
            
          </Collapse>
          </Container>
        </Navbar>
        
      <Route path="/drive" exact render={()=>(<Suspense fallback={<CircularProgress disableShrink />}>
              <CreateDrive skillMatrix={this.props.skillMatrix} />
            </Suspense>)} />
      <Route path="/home" exact component={Dashboard} />
      <Route path='/drive-candidate-list/:driveId' exact component={ScheduleDrive} />
      <Route path="/panel" exact component={PanelView} />
      <Route path="/view-candidate/:id" exact component={CandidateStatus} />
      <Route path="/enroll/:type" exact 
            render={()=>(<Suspense fallback={<div>Loading....!!!</div>}>
              <EnrollForm skillMatrix={this.props.skillMatrix}/>
            </Suspense>)} />
      {/* {this.props.authenticated ? null : <Redirect to="/" />} */}

      {/* <CandidateStatus /> */}   
      {/* <Container className="text-center my-5">
      <Cards goTo={this.scheduleDriveHandler}/>
    </Container> */}
    
  </div>
//   </Router>
);
}
}

export default withRouter(FullPageIntroWithNonFixedNavbar);