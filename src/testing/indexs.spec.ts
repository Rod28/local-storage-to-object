/**
 * @jest-environment jsdom
 */

import LocalStorage from '../';

describe('All testing LocalStorage', () => {
  describe('setItem()', () => {
    it('Success tests', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(true);
    });

    it('Failed tests', () => {
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

    it('Failed tests', () => {
      LocalStorage.setItems([]);
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

    it('Success tests - multi items', () => {
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

    it('Failed tests - with data in localStorage', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting.test', false)
      ).toEqual(false);
    });
  });

  describe('getItems()', () => {
    it('Success tests -  empty localStorage', () => {
      LocalStorage.removeItem();

      const items = LocalStorage.getItems([
        { key: 'keyLocalStorage' },
        { key: 'keyLocalStorage', value: 'isTesting' },
        { key: 'keyExample', value: 'data', defaultValue: [] },
        { key: 'keyFake', value: 'items' }
      ]);

      expect(items).toHaveLength(4);
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
    });

    it('Success tests -  with data in localStorage', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1, data: null } }
      ]);

      const items = LocalStorage.getItems([
        { key: 'keyLocalStorage' },
        { key: 'keyLocalStorage', value: 'isTesting' },
        { key: 'keyLocalStorage', value: 'isTesting.val' },
        { key: 'keyExample', value: 'data', defaultValue: [] },
        { key: 'keyFake' },
        { key: 'keyFake', value: 'items' }
      ]);

      expect(items).toHaveLength(6);
      expect(items).toEqual([
        { key: 'keyLocalStorage', localStorageData: { isTesting: true } },
        { key: 'keyLocalStorage', localStorageData: true },
        { key: 'keyLocalStorage', localStorageData: '*' },
        { key: 'keyExample', localStorageData: [] },
        { key: 'keyFake', localStorageData: {} },
        { key: 'keyFake', localStorageData: '*' }
      ]);
    });

    it('Success tests - multi items', () => {
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
    it('Success tests - call remove all', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(true);

      LocalStorage.removeItem();

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(false);
    });

    it('Success tests - call removeItem', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(true);

      LocalStorage.removeItem('keyLocalStorage');

      expect(LocalStorage.getItem('keyLocalStorage')).toEqual({});
    });

    it('Success tests - call multi removeItem', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } }
      ]);

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(true);
      expect(LocalStorage.getItem('keyExample', 'isExample', 0)).toEqual(1);

      LocalStorage.removeItem(['keyLocalStorage', 'keyExample']);

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(false);
      expect(LocalStorage.getItem('keyExample')).toEqual({});
    });

    it('Success tests - with empty string', () => {
      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } }
      ]);

      expect(LocalStorage.getItem('keyLocalStorage')).toEqual({
        isTesting: true
      });

      LocalStorage.removeItem('');

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

      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } }
      ]);

      expect(LocalStorage.getCapacity()).toEqual(2);

      LocalStorage.removeItem(['']);

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
      LocalStorage.removeItem();
    });

    it('Success tests - return an empty string', () => {
      expect(LocalStorage.getKeyName(0)).toEqual('');

      LocalStorage.setItems([
        { key: 'keyLocalStorage', value: { isTesting: true } },
        { key: 'keyExample', value: { isExample: 1 } }
      ]);
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
