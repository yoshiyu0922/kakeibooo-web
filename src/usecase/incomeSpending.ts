import IncomeSpendingRepository from '../repository/incomeSpending/incomeSpendingRepository';

class IncomeSpending {
  private incomeSpendingRepository: IncomeSpendingRepository;

  constructor({
    incomeSpendingRepository,
  }: {
    incomeSpendingRepository: IncomeSpendingRepository;
  }) {
    this.incomeSpendingRepository = incomeSpendingRepository;
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
    return await this.incomeSpendingRepository.search({
      userId,
      yyyymm,
      limit,
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
    return await this.incomeSpendingRepository.create({
      userId,
      accountId,
      categoryDetailId,
      accrualDate,
      amount,
      howToPayId,
      isIncome,
      content,
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
    return await this.incomeSpendingRepository.update({
      id,
      userId,
      accountId,
      categoryDetailId,
      accrualDate,
      amount,
      howToPayId,
      isIncome,
      content,
    });
  }

  public async delete({ id, userId }: { id: number; userId: number }) {
    return await this.incomeSpendingRepository.delete({ id, userId });
  }
}

export default IncomeSpending;
