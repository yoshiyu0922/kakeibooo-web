import gql from 'graphql-tag';

const createIncomeSpending = gql`
  mutation updateImcomeSpending(
    $userId: Long!
    $accountId: Long!
    $categoryDetailId: Long!
    $accrualDate: String!
    $amount: Int!
    $howToPayId: Int
    $isIncome: Boolean!
    $content: String
  ) {
    updateIncomeSpending(
      userId: $userId
      accountId: $accountId
      categoryDetailId: $categoryDetailId
      accrualDate: $accrualDate
      amount: $amount
      howToPayId: $howToPayId
      isIncome: $isIncome
      content: $content
    ) {
      id
    }
  }
`;

export default createIncomeSpending;
