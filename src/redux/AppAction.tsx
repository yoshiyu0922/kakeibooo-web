import { MasterType } from '../types/Master';
import { Dispatch } from 'redux';
import { AppState, AppStateType } from './AppState';
import GraphQLClient from '../core/graphQLClient';
import MasterRepository from '../repository/masterRepository';
import UserRepository from '../repository/userRepository';
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
    const master: MasterType = await fetchMaster(graphQLClient);
    const user = await fetchUser(graphQLClient);

    const result = { master: master, user: user } as AppStateType;

    dispatch(setData(result));
    return result;
  };
}

async function fetchMaster(graphQLClient: GraphQLClient) {
  return await new MasterRepository({
    graphQLClient: graphQLClient,
  })
    .fetchAll()
    .catch(err => {
      console.error(err);
      return {} as MasterType;
    });
}

async function fetchUser(graphQLClient: GraphQLClient) {
  const tokenOpt = localStorage.getItem('token');
  const token = tokenOpt == null ? '' : tokenOpt;

  return await new UserRepository({
    graphQLClient: graphQLClient,
  })
    .getUserByToken(token)
    .then(res => {
      return res.data['user'] as UserType;
    })
    .catch(err => {
      console.error(err);
      return {} as UserType;
    });
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
