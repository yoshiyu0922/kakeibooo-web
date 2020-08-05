import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import Root from './view/Root';
import { DispatchToPropsType } from './redux/AppContainer';
import { AppState } from './redux/AppState';
import GraphQLClient from './core/graphQLClient';
import Dependency from './core/dependency';
import UserRepository from './repository/userRepository';
import Authentication from './usecase/authentication';
import AccountRepository from './repository/accountRepository';
import Account from './usecase/account';
import IncomeSpendingRepository from './repository/incomeSpendingRepository';
import IncomeSpending from './usecase/incomeSpending';

type Props = DispatchToPropsType;

const token: string | null = localStorage.getItem('token');

const graphQLClient = new GraphQLClient({
  url: 'http://localhost:9000/execute',
  token: token,
});

// repositories
const userRepository = new UserRepository({ graphQLClient: graphQLClient });
const accountRepository = new AccountRepository({
  graphQLClient: graphQLClient,
});
const incomeSpendingRepository = new IncomeSpendingRepository({
  graphQLClient: graphQLClient,
});

// usecases
const authentication = new Authentication({ userRepository: userRepository });
const account = new Account({ accountRepository: accountRepository });
const incomeSpending = new IncomeSpending({
  incomeSpendingRepository: incomeSpendingRepository,
});

const dependency: Dependency = {
  authentication: authentication,
  account: account,
  incomeSpending: incomeSpending,
};

const App: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.setAppState(graphQLClient, {} as AppState);
  }, []);

  return <Root dependency={dependency} />;
};

export default App;
