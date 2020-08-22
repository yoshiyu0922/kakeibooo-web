export type CategoryType = {
  id: number;
  name: string;
  isIncome: boolean;
  isDeleted: boolean;
};

export type CategoryDetailType = {
  id: number;
  categoryId: number;
  name: string;
  isDeleted: boolean;
};

export type HowToPayType = {
  id: number;
  name: string;
};

export type MasterType = {
  categories: CategoryType[];
  categoryDetails: CategoryDetailType[];
  howToPays: HowToPayType[];
};
export const initMaster = {
  categories: new Array<CategoryType>(),
  categoryDetails: new Array<CategoryDetailType>(),
  howToPays: new Array<HowToPayType>(),
} as MasterType;
