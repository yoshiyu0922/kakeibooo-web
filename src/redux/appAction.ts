import { MasterType } from '../types/master';
import { Dispatch } from 'redux';
import { AppState, AppStateType } from './appState';
import GraphQLClient from '../core/graphQLClient';
import MasterRepository from '../repository/master/masterRepository';
import UserRepository from '../repository/user/userRepository';
import { UserType } from '../types/user';

export const SET_APP_STATE = 'SET_APP_STATE';

export function setData(state: AppStateType): MasterActionTypes {
  return {
    type: SET_APP_STATE,
    isFetching: false,
    master: state.master,
    user: state.user,
  };
}

function fetch(graphQLClient: GraphQLClient) {
  return async (dispatch: Dispatch<MasterActionTypes>) => {
    const master = fetchMaster(graphQLClient);
    const user = fetchUser(graphQLClient);

    const result = await Promise.all([master, user])
      .then((values: [MasterType, UserType]) => {
        return {
          master: values[0],
          user: values[1],
        } as AppStateType;
      })
      .catch(() => {
        return {} as AppStateType;
      });

    dispatch(setData(result));
    return result;
  };
}

async function fetchMaster(graphQLClient: GraphQLClient) {
  return await new MasterRepository({
    graphQLClient: graphQLClient,
  }).fetchAll();
}

async function fetchUser(graphQLClient: GraphQLClient) {
  const tokenOpt = localStorage.getItem('token');
  const token = tokenOpt == null ? '' : tokenOpt;

  return await new UserRepository({
    graphQLClient: graphQLClient,
  }).getUserByToken(token);
}

const shouldFetchPosts = (state: AppState) => {
  return !state.value || state.value.master.categories.length === 0;
};

export const fetchIfNeed = (graphQLClient: GraphQLClient) => async (
  dispatch: Dispatch<MasterActionTypes>,
  state: AppState
) => {
  if (shouldFetchPosts(state)) {
    return await fetch(graphQLClient)(dispatch);
  } else {
    return state.value;
  }
};

export interface SetMaster {
  type: typeof SET_APP_STATE;
  isFetching: boolean;
  master: MasterType;
  user: UserType;
}

export type MasterActionTypes = SetMaster;
