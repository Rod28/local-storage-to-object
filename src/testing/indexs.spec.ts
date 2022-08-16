/**
 * @jest-environment jsdom
 */

import LocalStorage from '../';

describe('All testing LocalStorage', () => {
  afterEach(() => {
    LocalStorage.removeItem();
  });

  describe('setItem()', () => {
    it('Success tests', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(true);
    });

    it('Failed tests - default value use', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTestings', false)
      ).toEqual(false);
    });
  });

  describe('setItems()', () => {
    it('Success tests', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } }
      ]);
      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(true);
      LocalStorage.removeItem();
    });

    it('Failed tests - empty localStorage', () => {
      expect(LocalStorage.getItem('keyLocalStorage')).toEqual({});
    });
  });

  describe('getItem()', () => {
    it('Success tests - empty localStorage', () => {
      expect(LocalStorage.getItem('keyLocalStorage')).toEqual({});
      expect(LocalStorage.getItem('keyLocalStorage', 'test')).toEqual('*');
      expect(LocalStorage.getItem('keyLocalStorage', 'test', '')).toEqual('');
    });

    it('Success tests - with data in localStorage', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(LocalStorage.getItem('keyLocalStorage')).toEqual({
        isTesting: true
      });
    });

    it('Success tests - get a specific value', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: false });
      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', true)
      ).toBeFalsy();
    });

    it('Success tests - save multi item', () => {
      LocalStorage.setItem('keyLocalStorage', {
        isTesting: true,
        name: 'test',
        value: 10
      });
      expect(
        LocalStorage.getItem('keyLocalStorage', ['isTesting', 'name', 'data'])
      ).toEqual({
        isTesting: true,
        name: 'test',
        data: '*'
      });
    });

    it('Failed tests - default value use', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting.test', false)
      ).toEqual(false);
    });
  });

  describe('getItems()', () => {
    it('Success tests - empty localStorage', () => {
      const items = LocalStorage.getItems([
        { key: 'keyLocalStorage' },
        { key: 'keyLocalStorage', value: 'isTesting' },
        { key: 'keyExample', value: 'data', defaultValue: [] },
        { key: 'keyFake', value: 'items' }
      ]);

      expect(items).toEqual([
        { key: 'keyLocalStorage', localStorageData: {} },
        { key: 'keyLocalStorage', localStorageData: '*' },
        { key: 'keyExample', localStorageData: [] },
        { key: 'keyFake', localStorageData: '*' }
      ]);

      expect(LocalStorage.getItems([{ value: 'example' }] as any)).toEqual([
        {
          key: '',
          localStorageData: '*'
        }
      ]);

      expect(
        LocalStorage.getItems([{ key: 'keyLocalStorage' }] as any)
      ).toEqual([
        {
          key: 'keyLocalStorage',
          localStorageData: {}
        }
      ]);
    });

    it('Success tests - with data in localStorage', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1, data: null } }
      ]);

      // Default value use
      const items = LocalStorage.getItems([
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

      expect(items).toHaveLength(8);
      expect(items).toEqual([
        { key: 'keyLocalStorage', localStorageData: { isTesting: true } },
        { key: 'keyLocalStorage', localStorageData: true },
        { key: 'keyLocalStorage', localStorageData: '*' },
        {
          key: 'keyExample',
          // All data not found, will have the default value of the 4th element to search
          localStorageData: { isExample: 1, data: 'default', id: 'default' }
        },
        { key: 'keyExample', localStorageData: { isExample: 1, data: '*' } },
        { key: 'keyExample', localStorageData: [] },
        { key: 'keyFake', localStorageData: {} },
        { key: 'keyFake', localStorageData: '*' }
      ]);
    });

    it('Success tests - save multi item', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1, data: 'data' } }
      ]);

      const items = LocalStorage.getItems([
        { key: 'keyLocalStorage' },
        { key: 'keyLocalStorage', value: 'isTesting' },
        { key: 'keyLocalStorage', value: 'isTesting.val' },
        {
          key: 'keyExample',
          value: ['isExample', 'id', 'data'],
          defaultValue: []
        },
        { key: 'keyFake', value: 'items' }
      ]);

      expect(items).toHaveLength(5);
      expect(items).toEqual([
        { key: 'keyLocalStorage', localStorageData: { isTesting: true } },
        { key: 'keyLocalStorage', localStorageData: true },
        { key: 'keyLocalStorage', localStorageData: '*' },
        {
          key: 'keyExample',
          localStorageData: { isExample: 1, data: 'data', id: [] }
        },
        { key: 'keyFake', localStorageData: '*' }
      ]);
    });
  });

  describe('removeItem()', () => {
    it('Success tests - remove all', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } }
      ]);

      expect(LocalStorage.getCapacity()).toEqual(2);
      LocalStorage.removeItem();
      expect(LocalStorage.getCapacity()).toEqual(0);
    });

    it('Success tests - remove one item', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } }
      ]);

      expect(LocalStorage.getCapacity()).toEqual(2);
      LocalStorage.removeItem('keyLocalStorage');
      expect(LocalStorage.getCapacity()).toEqual(1);
    });

    it('Success tests - remove multi item', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } },
        { key: 'otherKey', value: { value: 'value' } }
      ]);

      expect(LocalStorage.getCapacity()).toEqual(3);
      LocalStorage.removeItem(['keyLocalStorage', 'keyExample']);
      expect(LocalStorage.getCapacity()).toEqual(1);
    });

    it('Success tests - with empty string[]', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } }
      ]);

      expect(LocalStorage.getCapacity()).toEqual(2);
      LocalStorage.removeItem(['']);
      expect(LocalStorage.getCapacity()).toEqual(0);
    });

    it('Success tests - with empty array', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } }
      ]);

      expect(LocalStorage.getCapacity()).toEqual(2);
      LocalStorage.removeItem([]);
      expect(LocalStorage.getCapacity()).toEqual(0);
    });
  });

  describe('getKeyName()', () => {
    it('Success tests', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } }
      ]);

      expect(LocalStorage.getKeyName(0)).toEqual('keyLocalStorage');
    });

    it('Success tests - return an empty string', () => {
      expect(LocalStorage.getKeyName(0)).toEqual('');
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(LocalStorage.getKeyName(2)).toEqual('');
    });
  });

  describe('getCapacity()', () => {
    it('Success tests', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } }
      ]);

      expect(LocalStorage.getCapacity()).toEqual(2);
      LocalStorage.removeItem();
      expect(LocalStorage.getCapacity()).toEqual(0);
    });
  });
});
