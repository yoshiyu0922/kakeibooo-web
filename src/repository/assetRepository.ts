import GraphQLClient from '../core/graphQLClient';
import gql from 'graphql-tag';
import { AssetType } from '../types/asset';

class AssetRepository {
  private graphQLClient: GraphQLClient;

  constructor({ graphQLClient }: { graphQLClient: GraphQLClient }) {
    this.graphQLClient = graphQLClient;
  }

  public async fetchAll(userId: number) {
    return await this.graphQLClient
      .query(
        gql`
          query asset($userId: Long!) {
            asset(userId: $userId) {
              id
              userId
              name
              sortIndex
              isDeleted
              accounts {
                id
                userId
                assetId
                name
                balance
                sortIndex
                isDeleted
              }
            }
          }
        `,
        {
          variables: {
            userId: userId,
          },
        }
      )
      .then(res => {
        return res.data['asset'] as AssetType[];
      });
  }
}

export default AssetRepository;
