import React from 'react';
import { Redirect, Router, Route, IndexRedirect, browserHistory } from 'react-router';
import AppContainer from './layout/AppContainer';
import AuthenticatedContainer from './layout/AuthenticatedContainer';
import HomeContainer from './home/HomeContainer';
import LoginContainer from './login/LoginContainer';

export const routeNames = {
  home: 'home',
  login: 'login'
};

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRedirect to={routeNames.home} />
      <Route path={routeNames.login} component={LoginContainer} title="Login" />
      <Route component={AuthenticatedContainer}>
        <Route path={routeNames.home} component={HomeContainer} title="Home" />
      </Route>
      <Redirect path="*" to={routeNames.home} />
    </Route>
  </Router>
);

export default routes;
