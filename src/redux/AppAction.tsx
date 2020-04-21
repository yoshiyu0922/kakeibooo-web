import {MasterType} from '../types/Master';
import {Dispatch} from 'redux';
import Repository from "../components/core/Repository";
import {AppState} from "./AppState";

export const SET_MASTER = 'SET_MASTER';

export function setMasterData(master: MasterType): MasterActionTypes {
  return {
    type: SET_MASTER,
    isFetching: false,
    master: master,
  };
}

function fetchMaster() {
  return async (dispatch: Dispatch<MasterActionTypes>) => {
    const result: MasterType = await Repository.asyncFetchMaster(
      res => {
        return res.data as MasterType;
      },
      err => {
        console.error(err);
        return {} as MasterType;
      }
    );
    dispatch(setMasterData(result));
    return result;
  };
}

const shouldFetchPosts = (state: AppState) => {
  return !state.value || state.value.parentCategories.length === 0
};

export const fetchMasterIfNeed = () => async (dispatch: Dispatch<MasterActionTypes>, state: AppState) => {
  if (shouldFetchPosts(state)) {
    return await fetchMaster()(dispatch)
  } else {
    return state.value
  }
};

export interface SetMaster {
  type: typeof SET_MASTER;
  isFetching: boolean;
  master: MasterType;
}

export type MasterActionTypes = SetMaster;
