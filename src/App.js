import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormLayoutRoute from "layouts/FormLayout";
import BasicLayoutRoute from "layouts/BasicLayout";
import { routes as formRoutes } from 'routes/formLayoutRoutes';
import { routes as basicRoutes } from 'routes/basicLayoutRoutes';
import './App.css';
import 'rsuite/lib/styles/index.less';
import test from 'pages/test/test';
import LandingPage from 'pages/landing/LandingPage';
import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';

import socketClient  from "socket.io-client";
const SERVER = "http://127.0.0.1:8004";

const App = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  var socket = socketClient (SERVER);

  socket.on('message', (message) => console.log(message))

  return (
    <Router>
      {
        !loggedIn
          ?
          <Switch>
            <Route exact path="/">
              <Redirect to="/landing" />
            </Route>
            <Route path="/landing" component={LandingPage} />
            <FormLayoutRoute path='/login' component={LoginPage} />
            <FormLayoutRoute path='/register' component={RegisterPage} />
          </Switch>
          :
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/test" component={test} />
            {
              formRoutes.map((route, index) => <FormLayoutRoute key={index} path={route.path} component={route.component} />)
            }
            {
              basicRoutes.map((route, index) => <BasicLayoutRoute key={index} path={route.path} component={route.component} />)
            }
          </Switch>
      }
    </Router>
  );
}

export default App;