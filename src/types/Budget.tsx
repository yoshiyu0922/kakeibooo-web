export type Budget = {
  categoryId: number;
  categoryName: string;
  budgetMonth: Date;
  isIncome: false;
  content: string;
  details: BudgetDetail[];
}

export type BudgetDetail = {
  amount: number;
  resultAmount: number;
  howToPayId: number;
}
export const initBudgets = new Array<Budget>();

export interface UpdateBudgetParams {
  categoryId: number;
  budgetMonth: Date;
  amount: number;
  howToPayId: number;
  isIncome: false;
  content: string;
}

export const initializeUpdateParams = (data: Budget, initHowToPay: number) => {

  let detail = {} as BudgetDetail | undefined;
  if (data.details)
    detail = data.details.find((b: BudgetDetail) => {
      return b.howToPayId === initHowToPay
    });
  return {
    categoryId: data.categoryId,
    budgetMonth: data.budgetMonth,
    amount: detail ? detail.amount : 0,
    howToPayId: initHowToPay,
    isIncome: data.isIncome,
    content: data.content,
  } as UpdateBudgetParams
};
