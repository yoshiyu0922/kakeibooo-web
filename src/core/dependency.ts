import Authentication from '../usecase/authentication';

type Dependency = {
  authentication: Authentication;
};

export type DependencyProps = {
  dependency: Dependency;
};

export default Dependency;
