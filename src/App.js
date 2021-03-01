import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import FormLayoutRoute from "layouts/FormLayout";
import BasicLayoutRoute from "layouts/BasicLayout";
import { routes as formRoutes } from 'routes/formLayoutRoutes';
import { routes as basicRoutes } from 'routes/basicLayoutRoutes';
import AuthService from 'auth/Auth';
import 'rsuite/lib/styles/index.less';

import test from 'pages/test/test';

const App = () => {

  useEffect( () => {
    const result = AuthService.checkInitState()
  },[]);

  return (
    <Provider store={store}>
      <Router>
        {/* <MainNav /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to="/landing" />
          </Route>
          <Route path="/test" component={test} />
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

export default App;