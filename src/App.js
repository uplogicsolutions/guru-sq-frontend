import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import FormLayoutRoute from "layouts/FormLayout";
import BasicLayoutRoute from "layouts/BasicLayout";
import { routes as formRoutes } from 'routes/formLayoutRoutes';
import { routes as basicRoutes } from 'routes/basicLayoutRoutes';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login1" />
          </Route>
          {
            formRoutes.map((route) => <FormLayoutRoute path={route.path} component={route.component} />)
          }
          {
            basicRoutes.map((route) => <BasicLayoutRoute path={route.path} component={route.component} />)
          }
        </Switch>
      </Router>
    );
  }
}

export default App;