import GraphQLClient from '../core/graphQLClient';
import gql from 'graphql-tag';

class IncomeSpendingRepository {
  private graphQLClient: GraphQLClient;

  constructor({ graphQLClient }: { graphQLClient: GraphQLClient }) {
    this.graphQLClient = graphQLClient;
  }

  public async create({
    userId,
    accountId,
    categoryDetailId,
    accrualDate,
    amount,
    howToPayId,
    isIncome,
    content,
  }: {
    userId: number;
    accountId: number;
    accrualDate: string;
    categoryDetailId: number;
    amount: number;
    howToPayId: number;
    isIncome: boolean;
    content: string;
  }) {
    return await this.graphQLClient.mutation(
      gql`
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
      `,
      {
        variables: {
          userId: userId,
          accountId: accountId,
          categoryDetailId: categoryDetailId,
          accrualDate: accrualDate,
          amount: amount,
          howToPayId: howToPayId,
          isIncome: isIncome,
          content: content,
        },
      }
    );
  }
}

export default IncomeSpendingRepository;
