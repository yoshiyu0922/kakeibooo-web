export type AssetType = {
  assetId: number;
  name: string;
  accounts: AccountType[];
  sortIndex: number;
  isDeleted: boolean
}

export type AccountType = {
  accountId: number;
  userId: number;
  assetId: number;
  name: string;
  balance: number;
  sortIndex: number;
  isDeleted: boolean
}
export const initAssets = new Array<AssetType>();