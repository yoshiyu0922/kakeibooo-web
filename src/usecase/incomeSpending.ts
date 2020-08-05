import IncomeSpendingRepository from '../repository/incomeSpendingRepository';

class IncomeSpending {
  private incomeSpendingRepository: IncomeSpendingRepository;

  constructor({
    incomeSpendingRepository,
  }: {
    incomeSpendingRepository: IncomeSpendingRepository;
  }) {
    this.incomeSpendingRepository = incomeSpendingRepository;
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
}

export default IncomeSpending;
