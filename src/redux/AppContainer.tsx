import { AppState } from './AppState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchMasterIfNeed, MasterActionTypes } from './AppAction';
import App from '../App';
import GraphQLClient from '../core/graphQLClient';

const mapStateToProps = (state: AppState): AppState => {
  return state;
};

const mapDispatchToProps = (dispatch: Dispatch<MasterActionTypes>) => {
  return {
    fetchMaster: async (graphQLClient: GraphQLClient, state: AppState) => {
      await fetchMasterIfNeed(graphQLClient)(dispatch, state);
    },
  };
};

export type DispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
