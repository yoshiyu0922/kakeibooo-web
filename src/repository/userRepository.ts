import GraphQLClient from '../core/graphQLClient';
import gql from 'graphql-tag';

class UserRepository {
  private graphQLClient: GraphQLClient;

  constructor({ graphQLClient }: { graphQLClient: GraphQLClient }) {
    this.graphQLClient = graphQLClient;
  }

  public auth(userId: string, password: string) {
    return this.graphQLClient.mutation(
      gql`
        mutation auth($userId: String!, $password: String!) {
          auth(userId: $userId, password: $password) {
            token
          }
        }
      `,
      {
        variables: {
          userId: userId,
          password: password,
        },
      }
    );
  }

  public getUserByToken(token: String) {
    return this.graphQLClient.query(
      gql`
        query user($token: String!) {
          user(token: $token) {
            id
            frontUserId
            name
            isDeleted
          }
        }
      `,
      {
        variables: {
          token: token,
        },
      }
    );
  }
}

export default UserRepository;
