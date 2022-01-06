export type DataItem = {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
};

export type SortedData = {
  [key: string]: DataItem[];
};

export enum Sort {
  ByNameInAscendingOrder,
  ByNameInDescendingOrder,
  ByCountInAscendingOrder,
  ByCountInDescendingOrder,
}
