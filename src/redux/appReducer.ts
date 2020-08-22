import { combineReducers } from 'redux';
import { AppState, AppStateType } from './appState';
import { MasterActionTypes, SET_APP_STATE } from './appAction';
import { initMaster } from '../types/master';
import { initUser } from '../types/user';

const initialState: AppState = {
  isFetching: true,
  value: {
    master: initMaster,
    user: initUser,
  } as AppStateType,
};

export function appReducer(
  state = initialState,
  action: MasterActionTypes
): AppState {
  switch (action.type) {
    case SET_APP_STATE:
      return {
        isFetching: action.isFetching,
        value: { master: action.master, user: action.user },
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  app: appReducer,
});

export default reducer;
