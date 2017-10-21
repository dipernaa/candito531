import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import Login from './Login';
import { login } from '../actions';
import { routeNames } from '../routes';

export class LoginContainer extends Component {
  componentWillMount() {
    if (this.props.isLoggedIn) {
      browserHistory.push(`/${routeNames.home}`);
    }
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return <CircularProgress />;
    }

    return (
      <Login onSubmit={this.props.login} />
    );
  }
}

export const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    isLoading: auth.isLoading,
    isLoggedIn: auth.isLoggedIn
  };
};

export const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data))
    .then((result) => {
      if (!result.ok) {
        return null;
      }

      return browserHistory.push(`/${routeNames.home}`);
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
