import GraphQLClient from '../../core/graphQLClient';
import { AccountType } from '../../types/account';
import { fetchAll } from './query';

class AccountRepository {
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
        return res.data['account'] as AccountType[];
      });
  }
}

export default AccountRepository;
