import GraphQLClient from '../core/graphQLClient';
import gql from 'graphql-tag';
import { AccountType } from '../types/Account';

class AccountRepository {
  private graphQLClient: GraphQLClient;

  constructor({ graphQLClient }: { graphQLClient: GraphQLClient }) {
    this.graphQLClient = graphQLClient;
  }

  public async fetchAll() {
    return await this.graphQLClient
      .query(
        gql`
          query account {
            account(userId: 53341711000000) {
              id
              userId
              assetId
              name
              balance
              sortIndex
              isDeleted
            }
          }
        `
      )
      .then(res => {
        return res.data['account'] as AccountType[];
      });
  }
}

export default AccountRepository;
