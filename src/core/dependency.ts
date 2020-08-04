import Authentication from '../usecase/authentication';
import Account from '../usecase/account';

type Dependency = {
  authentication: Authentication;
  account: Account;
};

export type DependencyProps = {
  dependency: Dependency;
};

export default Dependency;
