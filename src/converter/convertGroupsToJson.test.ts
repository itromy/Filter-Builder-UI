import { expect, it } from 'vitest';
import type { GroupType } from '../components/Group/GroupTypes';
import convertGroupsToJson from './convertGroupsToJson';

it('converts to correct JSON for a single not nested group with one single condition', () => {
  const input: GroupType[] = [
    {
      id: 'group-1',
      groups: [], // no nested groups
      conditions: [
        {
          id: 'cond-1',
          parentId: 'group-1',
          field: 'name',
          operator: 'contains',
          value: 'o',
        },
      ],
      operator: 'and',
    },
  ];

  const result = convertGroupsToJson(input);

  const expected = {
    and: [
      {
        field: 'name',
        operator: 'contains',
        value: 'o',
      },
    ],
  };

  expect(result).toEqual(expected);
});

it('converts to correct JSON for a single not nested group with two single conditions', () => {
  const input: GroupType[] = [
    {
      id: 'group-1',
      groups: [], // no nested groups
      conditions: [
        {
          id: 'cond-1',
          parentId: 'group-1',
          field: 'name',
          operator: 'contains',
          value: 'o',
        },
        {
          id: 'cond-2',
          parentId: 'group-1',
          field: 'age',
          operator: 'greater_than',
          value: '30',
        },
      ],
      operator: 'and',
    },
  ];

  const result = convertGroupsToJson(input);

  const expected = {
    and: [
      {
        field: 'name',
        operator: 'contains',
        value: 'o',
      },
      {
        field: 'age',
        operator: 'greater_than',
        value: '30',
      },
    ],
  };

  expect(result).toEqual(expected);
});

it('converts to correct JSON for group with nested group', () => {
  const input: GroupType[] = [
    {
      id: 'group-1',
      groups: [
        {
          id: 'group-2',
          operator: 'or',
          groups: [],
          conditions: [
            {
              id: 'cond-3',
              parentId: 'group-2',
              field: 'birthday',
              operator: 'after',
              value: '2025-04-04T00:00:00.000Z',
            },
            {
              id: 'cond-4',
              parentId: 'group-2',
              field: 'birthday',
              operator: 'before',
              value: '2000-01-01T00:00:00.000Z',
            },
          ],
        },
      ],
      conditions: [
        {
          id: 'cond-1',
          parentId: 'group-1',
          field: 'name',
          operator: 'contains',
          value: 'o',
        },
        {
          id: 'cond-2',
          parentId: 'group-1',
          field: 'age',
          operator: 'greater_than',
          value: '30',
        },
      ],
      operator: 'and',
    },
  ];

  const result = convertGroupsToJson(input);

  const expected = {
    and: [
      {
        field: 'name',
        operator: 'contains',
        value: 'o',
      },
      {
        field: 'age',
        operator: 'greater_than',
        value: '30',
      },
      {
        or: [
          {
            field: 'birthday',
            operator: 'after',
            value: '2025-04-04T00:00:00.000Z',
          },
          {
            field: 'birthday',
            operator: 'before',
            value: '2000-01-01T00:00:00.000Z',
          },
        ],
      },
    ],
  };

  expect(result).toEqual(expected);
});
