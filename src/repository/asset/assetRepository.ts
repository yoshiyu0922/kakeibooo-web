import GraphQLClient from '../../core/graphQLClient';
import { fetchAll } from './query';
import { AssetType } from '../../types/asset';

class AssetRepository {
  private graphQLClient: GraphQLClient;

  constructor({ graphQLClient }: { graphQLClient: GraphQLClient }) {
    this.graphQLClient = graphQLClient;
  }

  public async fetchAll(userId: number) {
    return await this.graphQLClient
      .query(fetchAll, {
        variables: {
          userId: userId,
        },
      })
      .then(res => {
        return res.data['asset'] as AssetType[];
      });
  }
}

export default AssetRepository;
