import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import FormLayoutRoute from "layouts/FormLayout";
import BasicLayoutRoute from "layouts/BasicLayout";
import { routes as formRoutes } from 'routes/formLayoutRoutes';
import { routes as basicRoutes } from 'routes/basicLayoutRoutes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            {
              formRoutes.map((route, index) => <FormLayoutRoute key={index} path={route.path} component={route.component} />)
            }
            {
              basicRoutes.map((route, index) => <BasicLayoutRoute key={index} path={route.path} component={route.component} />)
            }
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;