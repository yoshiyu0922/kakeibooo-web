import GraphQLClient from '../../core/graphQLClient';
import { IncomeSpendingType } from '../../types/incomeSpending';
import { search } from './query';
import {
  createIncomeSpending,
  updateIncomeSpending,
  deleteIncomeSpending,
} from './mutation';

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
      .query(search, {
        variables: {
          userId: userId,
          yyyymm: yyyymm,
          limit: limit,
        },
      })
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
    return await this.graphQLClient.mutation(createIncomeSpending, {
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
    });
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
      .mutation(updateIncomeSpending, {
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
      })
      .then(res => res.data['updateIncomeSpending']['id'] as number);
  }

  public async delete({ id, userId }: { id: number; userId: number }) {
    return this.graphQLClient
      .mutation(deleteIncomeSpending, {
        variables: {
          id: id,
          userId: userId,
        },
      })
      .then(res => res.data['deleteIncomeSpending']['id'] as number);
  }
}

export default IncomeSpendingRepository;
