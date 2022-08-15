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
export declare type SetItemsLocalStorage = Array<SetItemLocalStorage>;
export declare type GetItemsLocalStorage = Array<GetItemLocalStorage>;
export declare type GetItemsResponseLocalStorage = Array<GetItemResponseLocalStorage>;
