import { AppState } from './AppState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchMasterIfNeed, MasterActionTypes } from './AppAction';
import App from '../App';

const mapStateToProps = (state: AppState): AppState => {
  return state;
};

const mapDispatchToProps = (dispatch: Dispatch<MasterActionTypes>) => {
  return {
    fetchMaster: async (state: AppState) => {
      await fetchMasterIfNeed()(dispatch, state);
    },
  };
};

export type DispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
