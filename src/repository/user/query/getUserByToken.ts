import gql from 'graphql-tag';

const getUserByToken = gql`
  query user($token: String!) {
    user(token: $token) {
      id
      frontUserId
      name
      isDeleted
    }
  }
`;

export default getUserByToken;
