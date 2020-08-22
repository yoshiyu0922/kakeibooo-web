import gql from 'graphql-tag';

const search = gql`
  query searchIncomeSpending($userId: Long!, $yyyymm: Int, $limit: Int) {
    searchIncomeSpending(userId: $userId, yyyymm: $yyyymm, limit: $limit) {
      id
      userId
      accountId
      accrualDate
      categoryId
      categoryDetailId
      accountName
      categoryName
      categoryDetailName
      amount
      howToPayId
      howToPayName
      isIncome
      content
      isDeleted
      createdAt
    }
  }
`;

export default search;
