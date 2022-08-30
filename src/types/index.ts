/**
 * Describes the methods and data types of the LocalStorage class.
 */
export declare class LocalStorageType {
  static getValueLocalStorage(_key: string): Record<string, any>;
  static saveDataLocalStorage(
    _key: string,
    _oldValues: Record<string, any>,
    _newValues: Record<string, any>
  ): void;
  static setItem(key: string, value: Record<string, any>): void;
  static setItems(items: SetItemsType): void;
  static getItem(
    key: string,
    value?: string | string[],
    defaultValue?: any
  ): any;
  static getItems(items: GetItemsType): GetItemsResponseType;
  static removeItem(key?: string | string[]): void;
  static getKeyName(index: number): string;
  static getCapacity(): number;
}

/**
 * Describes the data types used by the setItem method.
 */
export interface SetItemType {
  key: string;
  value: Record<string, any>;
}

/**
 * Describes the data types used by the getItem method.
 */
export interface GetItemType {
  key: string;
  value?: string | string[];
  defaultValue?: any;
}

/**
 * Describes the data types returned by the getItem method.
 */
export interface GetItemResponseType {
  key?: string;
  localStorageData?: any;
}

/**
 * Describes the data types used by the setItems method.
 */
export type SetItemsType = Array<SetItemType>;

/**
 * Describes the data types used by the getItems method.
 */
export type GetItemsType = Array<GetItemType>;

/**
 * Describes the data types returned by the getItems method.
 */
export type GetItemsResponseType = Array<GetItemResponseType>;

export default LocalStorageType;
