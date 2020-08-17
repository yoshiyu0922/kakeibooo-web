import moment from 'moment';

export type IncomeSpendingType = {
  id: number;
  userId: number;
  accountId: number;
  accrualDate: Date;
  categoryId: number;
  categoryDetailId: number;
  accountName: string;
  categoryName: string;
  categoryDetailName: string;
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
  id: number;
  accountId: number;
  accrualDate: string;
  categoryId: number;
  categoryDetailId: number;
  amount: number;
  howToPayId: number;
  isIncome: boolean;
  content: string;
  createdAt: string;
}

export const initUpdateInputValue = {} as UpdateIncomeSpendingParams;

export const initializeUpdateParams = (data: IncomeSpendingType) => {
  return {
    id: data.id,
    accountId: data.accountId,
    accrualDate: moment(data.accrualDate).format('YYYY-MM-DD hh:mm:ss'),
    categoryId: data.categoryId,
    categoryDetailId: data.categoryDetailId,
    amount: data.amount < 0 ? data.amount * -1 : data.amount,
    howToPayId: data.howToPayId,
    isIncome: data.isIncome,
    content: data.content,
    createdAt: moment(data.createdAt).format('YYYY-MM-DD hh:mm:ss'),
  } as UpdateIncomeSpendingParams;
};
