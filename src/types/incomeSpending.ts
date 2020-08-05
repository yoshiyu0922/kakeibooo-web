import moment from 'moment';

export type IncomeSpendingType = {
  incomeSpendingId: number;
  userId: number;
  accountId: number;
  accrualDate: Date;
  parentCategoryId: number;
  categoryId: number;
  accountName: string;
  parentCategoryName: string;
  categoryName: string;
  amount: number;
  howToPayId: number;
  howToPayName: string;
  isIncome: boolean;
  content: string;
  isDeleted: boolean;
  createdAt: Date;
};
export const initIncomeSpending = new Array<IncomeSpendingType>();

export interface RegisterIncomeSpendingParams {
  accountId: number;
  accrualDate: string;
  categoryDetailId: number;
  amount: number;
  howToPayId: number;
  isIncome: boolean;
  content: string;
}

export const initRegisterInputValue = {} as RegisterIncomeSpendingParams;

export interface UpdateIncomeSpendingParams {
  incomeSpendingId: number;
  accountId: number;
  accrualDate: string;
  parentCategoryId: number;
  categoryId: number;
  amount: number;
  howToPayId: number;
  isIncome: boolean;
  content: string;
  createdAt: string;
}

export const initUpdateInputValue = {} as UpdateIncomeSpendingParams;

export const initializeUpdateParams = (data: IncomeSpendingType) => {
  return {
    incomeSpendingId: data.incomeSpendingId,
    accountId: data.accountId,
    accrualDate: moment(data.accrualDate).format('YYYY-MM-DD hh:mm:ss'),
    parentCategoryId: data.parentCategoryId,
    categoryId: data.categoryId,
    amount: data.amount < 0 ? data.amount * -1 : data.amount,
    howToPayId: data.howToPayId,
    isIncome: data.isIncome,
    content: data.content,
    createdAt: moment(data.createdAt).format('YYYY-MM-DD hh:mm:ss'),
  } as UpdateIncomeSpendingParams;
};
