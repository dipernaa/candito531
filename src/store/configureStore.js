import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middleware = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(onComplete) {
  const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
  persistStore(store, { whitelist: [] }, onComplete);

  return store;
}
