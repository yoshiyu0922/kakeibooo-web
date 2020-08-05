import { MasterType } from '../types/Master';
import { UserType } from '../types/user';

export type AppStateType = {
  master: MasterType;
  user: UserType;
};

export interface AppState {
  isFetching: boolean;
  value: AppStateType;
}
