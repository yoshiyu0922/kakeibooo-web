export type ParentCategoryType = {
  id: number;
  name: string;
  isIncome: boolean;
  isDeleted: boolean;
};

export type CategoryType = {
  id: number;
  parentCategoryId: number;
  name: string;
  isDeleted: boolean;
};

export type HowToPayType = {
  id: number;
  name: string;
};

export type MasterType = {
  parentCategories: ParentCategoryType[];
  categories: CategoryType[];
  howToPays: HowToPayType[];
};
export const initMaster = {
  parentCategories: new Array<ParentCategoryType>(),
  categories: new Array<CategoryType>(),
  howToPays: new Array<HowToPayType>(),
} as MasterType;
