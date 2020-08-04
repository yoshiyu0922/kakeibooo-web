import { MasterType } from '../types/Master';
import { Dispatch } from 'redux';
import { AppState } from './AppState';
import GraphQLClient from '../core/graphQLClient';
import MasterRepository from '../repository/masterRepository';

export const SET_MASTER = 'SET_MASTER';

export function setMasterData(master: MasterType): MasterActionTypes {
  return {
    type: SET_MASTER,
    isFetching: false,
    master: master,
  };
}

function fetchMaster(graphQLClient: GraphQLClient) {
  return async (dispatch: Dispatch<MasterActionTypes>) => {
    const result: MasterType = await new MasterRepository({
      graphQLClient: graphQLClient,
    })
      .fetchAll()
      .catch(err => {
        console.error(err);
        return {} as MasterType;
      });

    dispatch(setMasterData(result));
    return result;
  };
}

const shouldFetchPosts = (state: AppState) => {
  return !state.value || state.value.categories.length === 0;
};

export const fetchMasterIfNeed = (graphQLClient: GraphQLClient) => async (
  dispatch: Dispatch<MasterActionTypes>,
  state: AppState
) => {
  if (shouldFetchPosts(state)) {
    return await fetchMaster(graphQLClient)(dispatch);
  } else {
    return state.value;
  }
};

export interface SetMaster {
  type: typeof SET_MASTER;
  isFetching: boolean;
  master: MasterType;
}

export type MasterActionTypes = SetMaster;
