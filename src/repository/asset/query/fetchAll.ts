import gql from 'graphql-tag';

const fetchAll = gql`
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
`;

export default fetchAll;
