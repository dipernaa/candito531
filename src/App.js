import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import Promise from 'promise-polyfill';
import 'whatwg-fetch'; // fetch API polyfill
import configureStore from './store/configureStore';
import routes from './routes';

injectTapEventPlugin();

if (!window.Promise) {
  window.Promise = Promise;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => {
        this.setState({ isLoading: false });
      })
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <Provider store={this.state.store}>
        {routes}
      </Provider>
    );
  }
}

export default App;
