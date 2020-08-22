import gql from 'graphql-tag';

const deleteIncomeSpending = gql`
  mutation deleteIncomeSpending($id: Long!, $userId: Long!) {
    deleteIncomeSpending(incomeSpendingId: $id, userId: $userId) {
      id
    }
  }
`;

export default deleteIncomeSpending;
