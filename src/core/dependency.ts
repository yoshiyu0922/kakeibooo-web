import Authentication from '../usecase/authentication';
import Account from '../usecase/account';
import IncomeSpending from '../usecase/incomeSpending';

type Dependency = {
  authentication: Authentication;
  account: Account;
  incomeSpending: IncomeSpending;
};

export type DependencyProps = {
  dependency: Dependency;
};

export default Dependency;
