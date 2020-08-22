import Authentication from '../usecase/authentication';
import Account from '../usecase/account';
import IncomeSpending from '../usecase/incomeSpending';
import Asset from '../usecase/asset';

type Dependency = {
  authentication: Authentication;
  account: Account;
  incomeSpending: IncomeSpending;
  asset: Asset;
};

export type DependencyProps = {
  dependency: Dependency;
};

export default Dependency;
