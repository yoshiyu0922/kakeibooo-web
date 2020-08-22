export type AccountType = {
  id: number;
  userId: number;
  assetId: number;
  name: String;
  balance: number;
  sortIndex: number;
  isDeleted: boolean;
};
export const initAccount = {} as AccountType;
