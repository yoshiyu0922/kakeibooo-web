import GraphQLClient from '../core/graphQLClient';
import gql from 'graphql-tag';
import { IncomeSpendingType } from '../types/incomeSpending';

class IncomeSpendingRepository {
  private graphQLClient: GraphQLClient;

  constructor({ graphQLClient }: { graphQLClient: GraphQLClient }) {
    this.graphQLClient = graphQLClient;
  }

  public async search({
    userId,
    yyyymm,
    limit,
  }: {
    userId: number;
    yyyymm: number;
    limit: number;
  }) {
    return await this.graphQLClient
      .query(
        gql`
          query searchIncomeSpending(
            $userId: Long!
            $yyyymm: Int
            $limit: Int
          ) {
            searchIncomeSpending(
              userId: $userId
              yyyymm: $yyyymm
              limit: $limit
            ) {
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
        `,
        {
          variables: {
            userId: userId,
            yyyymm: yyyymm,
            limit: limit,
          },
        }
      )
      .then(res => {
        return res.data['searchIncomeSpending'] as IncomeSpendingType[];
      });
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

  public async update({
    id,
    userId,
    accountId,
    categoryDetailId,
    accrualDate,
    amount,
    howToPayId,
    isIncome,
    content,
  }: {
    id: number;
    userId: number;
    accountId: number;
    categoryDetailId: number;
    accrualDate: string;
    amount: number;
    howToPayId: number;
    isIncome: boolean;
    content: string;
  }) {
    return this.graphQLClient
      .mutation(
        gql`
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
        `,
        {
          variables: {
            incomeSpendingId: id,
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
      )
      .then(res => res.data['updateIncomeSpending']['id'] as number);
  }

  public async delete({ id, userId }: { id: number; userId: number }) {
    return this.graphQLClient
      .mutation(
        gql`
          mutation deleteIncomeSpending($id: Long!, $userId: Long!) {
            deleteIncomeSpending(incomeSpendingId: $id, userId: $userId) {
              id
            }
          }
        `,
        {
          variables: {
            id: id,
            userId: userId,
          },
        }
      )
      .then(res => res.data['deleteIncomeSpending']['id'] as number);
  }
}

export default IncomeSpendingRepository;
