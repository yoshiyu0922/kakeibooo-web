import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import Root from './view/Root';
import { DispatchToPropsType } from "./redux/AppContainer";
import { AppState } from "./redux/AppState";
import GraphQLClient from "./core/graphQLClient";
import Dependency from "./core/dependency";
import UserRepository from "./repository/userRepository/userRepository";
import Authentication from "./usecase/authentication";

type Props = DispatchToPropsType;

const graphQLClient = new GraphQLClient({url: "http://localhost:9000/execute"});

// repositories
const userRepository = new UserRepository({graphQLClient: graphQLClient});

// usecases
const authentication = new Authentication({userRepository: userRepository});


const dependency: Dependency = {
  authentication: authentication
};

const App: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.fetchMaster({} as AppState);
  }, []);

  return (<Root dependency={dependency}/>);
};

export default App;
