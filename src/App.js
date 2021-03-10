import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormLayoutRoute from "layouts/FormLayout";
import BasicLayoutRoute from "layouts/BasicLayout";
import { routes as formRoutes } from 'routes/formLayoutRoutes';
import { routes as basicRoutes } from 'routes/basicLayoutRoutes';
import AuthService from 'auth/Auth';
import './App.css'
import 'rsuite/lib/styles/index.less';
import test from 'pages/test/test';
import LandingPage from 'pages/landing/LandingPage';
import LoginPage from 'pages/login/LoginPage';

const App = () => {
  const { loading, loggedIn, redirect, redirectUrl } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    AuthService.checkInitState()
  }, []);

  if(redirect) {
    history.push(redirectUrl);
  }

  return (
    loading
      ?
      <h1>Loading</h1>
      :
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