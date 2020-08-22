import gql from 'graphql-tag';

const auth = gql`
  mutation auth($userId: String!, $password: String!) {
    auth(userId: $userId, password: $password) {
      token
    }
  }
`;

export default auth;
