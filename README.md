# local-storage-to-object

It allows treating the data that is stored and extracted in the browser's **localStorage**, always as an object.

## Important

> This package is weighted to only be used on the client side, since it is necessary to use the **window** property of the browser

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
    { key: 'keyExample', value: 'data', defaultValue: [] },
    { key: 'keyFake' },
    { key: 'keyFake', value: 'items' }
  ]);
  /*
    valueLS = [
      { key: 'keyLocalStorage', localStorageData: { isTesting: true } },
      { key: 'keyLocalStorage', localStorageData: true },
      { key: 'keyLocalStorage', localStorageData: '*' },
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

&nbsp;

## Methods Reference

Description of each of the methods.

### - [setItem()](#setItem)

### - [setItems()](#setItems)

### - [getItem()](#getItem)

### - [getItems()](#getItems)

### - [removeItem()](#removeItem)

### - [getKeyName()](#getKeyName)

### - [getCapacity()](#getCapacity)

---

### <a id="setItem"></a> setItem()

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

### <a id="setItems"></a> setItems()

  ```javascript
  LocalStorage.setItems(items);
  ```

  It allows to store several keys with their respective objects, at the same time.

- For each element that exists in the array, first get the localStorage object that matches the 'key' of the current element and combine the existing values ​​with the new values. This new value is stored under the current 'key'.

  **Parameters:**

  | Name | Type | Default | Description |
  | -----|------|---------|------------ |
  | items | [SetItemsLocalStorage](#setItemsLocalStorage) | N/A | Array of objects to store in localStorage |

  Does not return any value.

---

### <a id="getItem"></a> getItem()

  ```javascript
  LocalStorage.getItem(key, value?, defaultValue);
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

### <a id="getItems"></a> getItems()

  ```javascript
  LocalStorage.getItems(items);
  ```

  Allows you to get multiple keys from localStorage, as well as the object assigned to each key.

- For each element that exists in the array, it allows obtaining the value corresponding to that 'key', a single element of that 'key' or multiple elements existing in the current 'key'.

  **Parameters:**

  | Name | Type | Default | Description |
  | -----|------|---------|------------ |
  | items | [GetItemsLocalStorage](#getItemsLocalStorage) | N/A | Array of objects to get from localStorage |

  Return an array of objects matching each of the 'key' or an empty array.

---

### <a id="removeItem"></a> removeItem()

  ```javascript
  LocalStorage.removeItem(key);
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

### <a id="getKeyName"></a> getKeyName()

  ```javascript
  LocalStorage.getKeyName();
  ```

  When passed a number n, this method returns the name of the nth key in storage.

  Return the name of the index found, if it does not exist it returns an empty string.

---

### <a id="getCapacity"></a> getCapacity()

  ```javascript
  LocalStorage.getCapacity();
  ```

  Get the number of 'keys' stored in localStorage.

  Devuelve el número de 'claves' almacenadas en localStorage.

&nbsp;

## Data Types

### <a id="setItemsLocalStorage"></a> SetItemsLocalStorage

  This data type is an array of objects, where each object has the following structure.

  **Interface:**

  | Name | Type | Description |
  | -----|------|------------ |
  | key | string | Name on which the values ​​will be stored in localStorage |
  | value | object | Value or values ​​to store in localStorage |

### <a id="getItemsLocalStorage"></a> GetItemsLocalStorage

  This data type is an array of objects, where each object has the following structure.

  **Interface:**

  | Name | Type | Description |
  | -----|------|------------ |
  | key | string | Name of values ​​stored in localStorage |
  | value | string \\| string[] | Value or values ​​that you want to access |
  | defaultValue | any | Default value in case `value` does not exist |
