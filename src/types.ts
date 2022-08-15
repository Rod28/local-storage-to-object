export interface SetItemLocalStorage {
  key: string;
  value: Record<string, any>;
}

export interface GetItemLocalStorage {
  key: string;
  value?: string | string[];
  defaultValue?: any;
}

export interface GetItemResponseLocalStorage {
  key?: string;
  localStorageData?: any;
}

export type SetItemsLocalStorage = Array<SetItemLocalStorage>;
export type GetItemsLocalStorage = Array<GetItemLocalStorage>;
export type GetItemsResponseLocalStorage = Array<GetItemResponseLocalStorage>;
