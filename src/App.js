import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './components/Nav'
import { withRouter } from 'react-router-dom'

function App(props) {
  const { pathname } = props.location
  return (
    <div className="App">
      {pathname !== '/' && pathname !== '/register' ? <Nav /> : null}
      {routes}
    </div>
  );
}

export default withRouter(App);
