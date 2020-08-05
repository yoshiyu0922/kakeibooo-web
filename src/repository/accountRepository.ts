import GraphQLClient from '../core/graphQLClient';
import gql from 'graphql-tag';
import { AccountType } from '../types/Account';

class AccountRepository {
  private graphQLClient: GraphQLClient;

  constructor({ graphQLClient }: { graphQLClient: GraphQLClient }) {
    this.graphQLClient = graphQLClient;
  }

  public async fetchAll(userId: number) {
    return await this.graphQLClient
      .query(
        gql`
          query account($userId: Long!) {
            account(userId: $userId) {
              id
              userId
              assetId
              name
              balance
              sortIndex
              isDeleted
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
        return res.data['account'] as AccountType[];
      });
  }
}

export default AccountRepository;
