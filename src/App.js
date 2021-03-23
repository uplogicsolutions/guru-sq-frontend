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
import socket from './socket';
import Authorization from './components/authorization/Authorization';

const App = () => {
  const { loggedIn } = useSelector((state) => state.auth);

  socket.on('message', (message) => console.log(message))

  return (
    <Router>
      <Authorization>
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
      </Authorization>
    </Router>
  );
}

export default App;