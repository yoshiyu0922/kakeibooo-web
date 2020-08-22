import { AppState } from './appState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchIfNeed, MasterActionTypes } from './appAction';
import App from '../App';
import GraphQLClient from '../core/graphQLClient';

const mapStateToProps = (state: AppState): AppState => {
  return state;
};

const mapDispatchToProps = (dispatch: Dispatch<MasterActionTypes>) => {
  return {
    setAppState: async (graphQLClient: GraphQLClient, state: AppState) => {
      await fetchIfNeed(graphQLClient)(dispatch, state);
    },
  };
};

export type DispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
