import GraphQLClient from '../../core/graphQLClient';
import { MasterType } from '../../types/master';
import { fetchAll } from './query';

class MasterRepository {
  private graphQLClient: GraphQLClient;

  constructor({ graphQLClient }: { graphQLClient: GraphQLClient }) {
    this.graphQLClient = graphQLClient;
  }

  public fetchAll() {
    return this.graphQLClient.query(fetchAll).then(res => {
      return res.data as MasterType;
    });
  }
}

export default MasterRepository;
