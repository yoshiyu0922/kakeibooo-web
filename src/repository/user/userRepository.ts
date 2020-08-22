import GraphQLClient from '../../core/graphQLClient';
import { UserType } from '../../types/user';
import { getUserByToken } from './query';
import { auth } from './mutation';

class UserRepository {
  private graphQLClient: GraphQLClient;

  constructor({ graphQLClient }: { graphQLClient: GraphQLClient }) {
    this.graphQLClient = graphQLClient;
  }

  public auth(userId: string, password: string) {
    return this.graphQLClient.mutation(auth, {
      variables: {
        userId: userId,
        password: password,
      },
    });
  }

  public getUserByToken(token: String) {
    return this.graphQLClient
      .query(getUserByToken, {
        variables: {
          token: token,
        },
      })
      .then(res => {
        return res.data['user'] as UserType;
      });
  }
}

export default UserRepository;
