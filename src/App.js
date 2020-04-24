import React from 'react';
import Main from './components/Main'
import ReactGA from 'react-ga'
const trackingId = 'UA-145313010-2'
function App(props) {
  ReactGA.initialize(trackingId);
  return (
    <Main props={props}/>
  );
}

export default App;
