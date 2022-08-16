# local-storage-to-object

This package contains the same functionality as **window.localStorage**, as it makes use of it, with the difference that everything that is stored in and fetched from **window.localStorage** will always be treated as an object.

## Important

> Note: This package is weighted to be used only on the client side, since it is necessary to use the **window** property of the browser.

## Table of Contents

<!-- no toc -->
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Methods Reference](#methods-reference)
  - [setItem()](#setitem)
  - [setItems()](#setitems)
  - [getItem()](#getitem)
  - [getItems()](#getitems)
  - [removeItem()](#removeitem)
  - [getKeyName()](#getkeyname)
  - [getCapacity()](#getcapacity)
- [Data Types](#data-types)
  - [SetItemsLocalStorage](#setitemslocalstorage)
  - [GetItemsLocalStorage](#getitemslocalstorage)
- [Resources](#resources)

## Installation

Using npm:

```bash
npm install --save local-storage-to-object

npm i local-storage-to-object
```

## Basic Usage

For this example we will name it **LocalStorage**, but you can use anything else.

Example:

``` javascript
import LocalStorage from 'local-storage-to-object';

function myFuction() {
  // Do something...


  // Add values
  LocalStorage.setItem('keyLocalStorage', { isTesting: true });

  // Get values
  // Get an object stored in localStorage
  const valueLS = LocalStorage.getItem('keyLocalStorage');
  // valueLS = { isTesting: true }

  // Acceda a un valor específico del objeto almacenado en localStorage
  const _valueLS = LocalStorage.getItem('keyLocalStorage', 'isTesting');
  // _valueLS = true

  // Delete values
  // To delete a key and its value
  LocalStorage.removeItem('keyLocalStorage');

  // Multiple keys can also be deleted
  LocalStorage.removeItem(['keyLocalStorage']);

  // To completely clean the localStorage
  LocalStorage.removeItem();


  // Do something...
}

```

Example to store several keys at once:

``` javascript
import LocalStorage from 'local-storage-to-object';

function myFuction() {
  // Do something...


  LocalStorage.setItems([
    { key: 'keyLocalStorage', value: { isTesting: true } }
    { key: 'keyExample', value: { id: '123456', value: 10 } }
  ]);


  // Do something...
}

```

Example to get multiple keys at once. You can also access one of several values ​​of the returned object, and in case those values ​​do not exist, a default value is assigned to that value.:

``` javascript
import LocalStorage from 'local-storage-to-object';

function myFuction() {
  // Do something...


  LocalStorage.setItems([
    { key: 'keyLocalStorage', value: { isTesting: true } },
    { key: 'keyExample', value: { isExample: 1, data: null } }
  ]);

  const valueLS = LocalStorage.getItems([
    { key: 'keyLocalStorage' },
    { key: 'keyLocalStorage', value: 'isTesting' },
    { key: 'keyLocalStorage', value: 'isTesting.val' },
    {
      key: 'keyExample',
      value: ['isExample', 'data', 'id'],
      defaultValue: 'default'
    },
    { key: 'keyExample', value: ['isExample', 'data'] },
    { key: 'keyExample', value: 'data', defaultValue: [] },
    { key: 'keyFake' },
    { key: 'keyFake', value: 'items' }
  ]);
  /*
    valueLS = [
      { key: 'keyLocalStorage', localStorageData: { isTesting: true } },
      { key: 'keyLocalStorage', localStorageData: true },
      { key: 'keyLocalStorage', localStorageData: '*' },
      {
        key: 'keyExample',
        localStorageData: { isExample: 1, data: 'default', id: 'default' }
      },
      { key: 'keyExample', localStorageData: { isExample: 1, data: '*' } },
      { key: 'keyExample', localStorageData: [] },
      { key: 'keyFake', localStorageData: {} },
      { key: 'keyFake', localStorageData: '*' }
    ]
  */


  // Do something...
}

```

Example to obtain the name of a stored key, through the index:

``` javascript
import LocalStorage from 'local-storage-to-object';

function myFuction() {
  // Do something...


  LocalStorage.setItems([
    { key: 'keyLocalStorage', value: { isTesting: true } },
    { key: 'keyExample', value: { isExample: 1 } }
  ]);

  const valueLS = LocalStorage.getKeyName(0);
  // valueLS = 'keyLocalStorage'


  // Do something...
}

```

Example to count the number of stored keys:

``` javascript
import LocalStorage from 'local-storage-to-object';

function myFuction() {
  // Do something...


  LocalStorage.setItems([
    { key: 'keyLocalStorage', value: { isTesting: true } },
    { key: 'keyExample', value: { isExample: 1 } }
  ]);

  const valueLS = LocalStorage.getCapacity();
  // valueLS = 2


  // Do something...
}

```

> Read the [tests of each of the methods](https://github.com/Rod28/local-storage-to-object/blob/main/src/testing/indexs.spec.ts) in the tests to get a clearer idea of ​​the capabilities of their use.

&nbsp;

## Methods Reference

Description of each of the methods.

- [LocalStorage.setItem(key, value)](#setitem)

- [LocalStorage.setItems(items)](#setitems)

- [LocalStorage.getItem(key, value, defaultValue)](#getitem)

- [LocalStorage.getItems(items)](#getitems)

- [LocalStorage.removeItem(key)](#removeitem)

- [LocalStorage.getKeyName()](#getkeyname)

- [LocalStorage.getCapacity()](#getcapacity)

---

### setItem()

  ```javascript
  LocalStorage.setItem(key, value);
  ```

  Before storing a new value in **localStorage**, it is validated if the 'key' on which will work, exists or not.

- If the 'key' already exists, it will extract from **localStorage**, the object that matches the 'key', and its values ​​will be merged with those of the new object, so that the new values ​​can overwrite one or several values ​​of the existing ones, in addition to add new values ​​to the object.

- If the 'key' does not exist, it will simply be added with its respective value object.

  **Parameters:**

  | Name | Type | Default | Description |
  | -----|------|---------|------------ |
  | key | string | N/A | Name on which the values ​​will be stored in localStorage |
  | value | object | N/A | Value or values ​​to store in localStorage |

  Does not return any value.

---

### setItems()

  ```javascript
  LocalStorage.setItems(items);
  ```

  It allows to store several keys with their respective objects, at the same time.

- For each element that exists in the array, first get the localStorage object that matches the 'key' of the current element and combine the existing values ​​with the new values. This new value is stored under the current 'key'.

  **Parameters:**

  | Name | Type | Default | Description |
  | -----|------|---------|------------ |
  | items | [SetItemsLocalStorage](#setitemslocalstorage) | N/A | Array of objects to store in localStorage |

  Does not return any value.

---

### getItem()

  ```javascript
  LocalStorage.getItem(key, value?, defaultValue?);
  ```

  To get a value, look inside **localStorage** for the object that matches the value of 'key', and return the entire object.

- If the value is not found, an empty object will be returned.

- From the object returned from **localStorage**, a single value can be accessed instead of the entire object.

- You can set a default value, in case you want to access an attribute of the object returned by **localStorage**, and it does not exist.

- If the second argument is passed as an array, multiple objects can be requested, and those that are not found will be returned with the default value assigned.

  **Parameters:**

  | Name | Type | Default | Description |
  | -----|------|---------|------------ |
  | key | string | N/A | Name of values ​​stored in localStorage |
  | value | string \\| string[] | N/A | Value or values ​​that you want to access |
  | defaultValue | any | * | Default value in case `value` does not exist |

  Return an object that matches the value of 'key' or an empty object.

---

### getItems()

  ```javascript
  LocalStorage.getItems(items);
  ```

  Allows you to get multiple keys from localStorage, as well as the object assigned to each key.

- For each element that exists in the array, it allows obtaining the value corresponding to that 'key', a single element of that 'key' or multiple elements existing in the current 'key'.

  **Parameters:**

  | Name | Type | Default | Description |
  | -----|------|---------|------------ |
  | items | [GetItemsLocalStorage](#getitemslocalstorage) | N/A | Array of objects to get from localStorage |

  Return an array of objects matching each of the 'key' or an empty array.

---

### removeItem()

  ```javascript
  LocalStorage.removeItem(key?);
  ```

  You can completely clean localStorage or remove one or more 'keys'. Keep in mind that when removing 'keys', their assigned objects will also be removed.

- If 'key' is passed as a string, the matching 'key' will be removed, as well as its assigned object.

- If the 'key' is passed as an array, all matching 'keys' will be removed, as well as their assigned objects.

- If the 'key' is not passed, the entire localStorage will be cleaned, regardless of whether there are values ​​that were added with this functionality or not.

  **Parameters:**

  | Name | Type | Default | Description |
  | -----|------|---------|------------ |
  | key | string \\| string[] | N/A | Name(s) on which to delete the values ​​in localStorage |

  Does not return any value.

---

### getKeyName()

  ```javascript
  LocalStorage.getKeyName();
  ```

  When passed a number n, this method returns the name of the nth key in storage.

  Return the name of the index found, if it does not exist it returns an empty string.

---

### getCapacity()

  ```javascript
  LocalStorage.getCapacity();
  ```

  Get the number of 'keys' stored in localStorage.

  Devuelve el número de 'claves' almacenadas en localStorage.

&nbsp;

## Data Types

### SetItemsLocalStorage

  This data type is an array of objects, where each object has the following structure.

  **Interface:**

  | Name | Type | Description |
  | -----|------|------------ |
  | key | string | Name on which the values ​​will be stored in localStorage |
  | value | object | Value or values ​​to store in localStorage |

### GetItemsLocalStorage

  This data type is an array of objects, where each object has the following structure.

  **Interface:**

  | Name | Type | Description |
  | -----|------|------------ |
  | key | string | Name of values ​​stored in localStorage |
  | value | string \\| string[] | Value or values ​​that you want to access |
  | defaultValue | any | Default value in case `value` does not exist |

&nbsp;

## Resources

- [Changelog](https://github.com/Rod28/local-storage-to-object/blob/main/CHANGELOG.md)
- [Tests](https://github.com/Rod28/local-storage-to-object/blob/main/src/testing/indexs.spec.ts)

&nbsp;
