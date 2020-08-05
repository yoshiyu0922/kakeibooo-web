import { applyMiddleware, createStore } from 'redux';
import reducer from './AppReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

function createStoreByEnvironment() {
  if (process.env.NODE_ENV === 'production')
    return createStore(reducer, applyMiddleware(thunk));
  else return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
}

const store = createStoreByEnvironment();

export type AppStoreType = ReturnType<typeof store.getState>;

export default store;

export const appStateSelector = (state: AppStoreType) => {
  return state.app;
};
