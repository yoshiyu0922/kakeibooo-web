import gql from 'graphql-tag';

const updateIncomeSpending = gql`
  mutation updateIncomeSpending(
    $incomeSpendingId: Long
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
      incomeSpendingId: $incomeSpendingId
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

export default updateIncomeSpending;
