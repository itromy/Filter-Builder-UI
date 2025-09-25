import convertJsonToGroups from './convertJsonToGroups';
import type { QueryGroup, Rule } from '../models/JsonResult';
import { vi, beforeEach, describe, expect, it } from 'vitest';

let counter = 0;
vi.mock('uuid', () => {
  return {
    v4: vi.fn(() => `mocked-id-${counter++}`),
  };
});

beforeEach(() => {
  counter = 0;
  vi.clearAllMocks();
});

describe('transformJsonToFilterGroups', () => {
  it('returns empty array for null input', () => {
    const result = convertJsonToGroups(null);

    expect(result).toEqual([]);
  });

  it('transforms a simple QueryGroup with one rule', () => {
    const input: QueryGroup = {
      and: [{ field: 'age', operator: 'greater_than', value: 30 } as Rule],
    };

    const result = convertJsonToGroups(input);
    expect(result).toEqual([
      {
        id: 'mocked-id-0',
        operator: 'and',
        groups: [],
        conditions: [
          {
            id: 'mocked-id-1',
            field: 'age',
            operator: 'greater_than',
            parentId: 'mocked-id-0',
            value: 30,
          },
        ],
      },
    ]);
  });

  it('transform nested groups', () => {
    const input: QueryGroup = {
      or: [
        { field: 'role', operator: 'equals', value: 'admin' } as Rule,
        {
          and: [{ field: 'active', operator: 'is_true', value: true } as Rule],
        },
      ],
    };

    const result = convertJsonToGroups(input);
    expect(result).toEqual([
      {
        id: 'mocked-id-0',
        operator: 'or',
        conditions: [
          {
            field: 'role',
            id: 'mocked-id-1',
            operator: 'equals',
            parentId: 'mocked-id-0',
            value: 'admin',
          },
        ],
        groups: [
          {
            id: 'mocked-id-2',
            operator: 'and',
            conditions: [
              {
                field: 'active',
                id: 'mocked-id-3',
                operator: 'is_true',
                parentId: 'mocked-id-2',
                value: true,
              },
            ],
            groups: [],
          },
        ],
      },
    ]);
  });

  it('should skip invalid items', () => {
    const json: unknown = {
      or: [
        {
          field: 'role',
          operator: 'equals',
          value: 'admin',
        },
        {
          invalidKey: 'should be skipped',
        },
      ],
    };

    const result = convertJsonToGroups(json as QueryGroup);

    expect(result).toEqual([
      {
        id: 'mocked-id-0',
        operator: 'or',
        conditions: [
          {
            field: 'role',
            operator: 'equals',
            value: 'admin',
            parentId: 'mocked-id-0',
            id: 'mocked-id-1',
          },
        ],
        groups: [],
      },
    ]);
  });

  it('should throw error for invalid group', () => {
    const input = { foo: [] };
    expect(() => convertJsonToGroups(input as unknown as QueryGroup)).toThrow('Invalid JSON group');
  });
});
