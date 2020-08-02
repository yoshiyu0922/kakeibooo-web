import { combineReducers } from 'redux';
import { AppState } from './AppState';
import { MasterActionTypes, SET_MASTER } from './AppAction';
import { initMaster } from '../types/Master';

const initialState: AppState = {
  isFetching: true,
  value: initMaster,
};

export function appReducer(
  state = initialState,
  action: MasterActionTypes
): AppState {
  switch (action.type) {
    case SET_MASTER:
      return { isFetching: action.isFetching, value: action.master };
    default:
      return state;
  }
}

const reducer = combineReducers({
  app: appReducer,
});

export default reducer;
