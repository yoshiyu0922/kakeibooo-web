import gql from 'graphql-tag';

const fetchAll = gql`
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
`;

export default fetchAll;
