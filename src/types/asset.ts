import { AccountType } from './account';

export type AssetType = {
  id: number;
  userId: number;
  name: string;
  sortIndex: number;
  isDeleted: boolean;
  accounts: AccountType[];
};

export const initAssets = new Array<AssetType>();
