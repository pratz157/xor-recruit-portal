import React, { Component } from 'react';
import LandingContainer from './Containers/LandingContainer';
import FooterPage from './Components/Footer/Footer';
// import './App.css';

class App extends Component {
  render() {
    return (
      // <div className="App">
      <div style={{height: '100%', width: '100%'}}>
        <LandingContainer />
        <FooterPage />
      </div>
      // <LandingContainer />
    );
  }
}

export default App;
