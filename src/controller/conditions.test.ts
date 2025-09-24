import { getEmptyCondition, addCondition, deleteCondition, updateCondition } from './conditions';
import type { GroupType } from '../components/Group/GroupTypes';
import type { ConditionType } from '../components/Condition/ConditionTypes';

let counter = 0;

vi.mock('uuid', () => {
  return {
    v4: () => `mocked-id-${counter++}`,
  };
});

beforeEach(() => {
  counter = 0;
  vi.clearAllMocks();
});

describe('getEmptyCondition', () => {
  it('creates an empty condition with given parentId', () => {
    const result = getEmptyCondition('parent-1');

    expect(result).toEqual<ConditionType>({
      id: 'mocked-id-0',
      parentId: 'parent-1',
      field: '',
      operator: '',
      value: '',
    });
  });
});

describe('addCondition', () => {
  it('adds a new condition to the group with matching parentId', () => {
    const input: GroupType[] = [{ id: 'group-1', operator: 'and', conditions: [], groups: [] }];

    const result = addCondition('group-1', input);

    expect(result[0].conditions[0]).toEqual({
      id: 'mocked-id-0',
      parentId: 'group-1',
      field: '',
      operator: '',
      value: '',
    });
  });

  it('adds condition to nested groups', () => {
    const data: GroupType[] = [
      {
        id: 'group-1',
        operator: 'and',
        conditions: [],
        groups: [{ id: 'group-2', operator: 'or', conditions: [], groups: [] }],
      },
    ];

    const result = addCondition('group-2', data);

    expect(result[0].groups[0].conditions[0]).toEqual({
      id: 'mocked-id-0',
      parentId: 'group-2',
      field: '',
      operator: '',
      value: '',
    });
  });

  it('adds no condition if parentId not found', () => {
    const data: GroupType[] = [{ id: 'group-1', operator: 'and', conditions: [], groups: [] }];

    const result = addCondition('group-unknown', data);

    expect(result).toEqual(data);
  });
});

describe('deleteCondition', () => {
  it('deletes a condition from group with given id', () => {
    const data: GroupType[] = [
      {
        id: 'group-1',
        operator: 'and',
        conditions: [
          {
            id: 'cond-1',
            parentId: 'group-1',
            field: 'f',
            operator: '=',
            value: '1',
          },
        ],
        groups: [],
      },
    ];

    const result = deleteCondition('group-1', 'cond-1', data);

    expect(result[0].conditions).toHaveLength(0);
  });

  it('deletes a condition in a nested group', () => {
    const data: GroupType[] = [
      {
        id: 'group-1',
        operator: 'and',
        conditions: [],
        groups: [
          {
            id: 'group-2',
            operator: 'or',
            conditions: [
              {
                id: 'cond-1',
                parentId: 'group-2',
                field: 'x',
                operator: '=',
                value: 'y',
              },
            ],
            groups: [],
          },
        ],
      },
    ];

    const result = deleteCondition('group-2', 'cond-1', data);

    expect(result[0].groups[0].conditions).toHaveLength(0);
  });

  it('does nothing if condition not found by id', () => {
    const data: GroupType[] = [
      {
        id: 'group-1',
        operator: 'and',
        conditions: [
          {
            id: 'cond-1',
            parentId: 'group-1',
            field: 'f',
            operator: '=',
            value: '1',
          },
        ],
        groups: [],
      },
    ];

    const result = deleteCondition('group-1', 'cond-unknown', data);

    expect(result).toEqual(data);
  });
});

describe('updateCondition', () => {
  it('updates the matching condition in the group', () => {
    const data: GroupType[] = [
      {
        id: 'group-1',
        operator: 'and',
        conditions: [
          {
            id: 'cond-1',
            parentId: 'group-1',
            field: 'f',
            operator: '=',
            value: '1',
          },
        ],
        groups: [],
      },
    ];

    const result = updateCondition('group-1', 'cond-1', { value: '2' }, data);

    expect(result[0].conditions[0].value).toBe('2');
  });

  it('updates the matching condition in a nested group', () => {
    const data: GroupType[] = [
      {
        id: 'group-1',
        operator: 'and',
        conditions: [],
        groups: [
          {
            id: 'group-2',
            operator: 'or',
            conditions: [
              {
                id: 'cond-1',
                parentId: 'group-2',
                field: 'x',
                operator: '=',
                value: 'y',
              },
            ],
            groups: [],
          },
        ],
      },
    ];

    const result = updateCondition('group-2', 'cond-1', { field: 'z' }, data);

    expect(result[0].groups[0].conditions[0].field).toBe('z');
  });

  it('updates nothing if condition not found', () => {
    const data: GroupType[] = [
      {
        id: 'group-1',
        operator: 'and',
        conditions: [
          {
            id: 'cond-1',
            parentId: 'group-1',
            field: 'f',
            operator: '=',
            value: '1',
          },
        ],
        groups: [],
      },
    ];

    const result = updateCondition('group-1', 'cond-unknown', { value: 'new' }, data);

    expect(result).toEqual(data);
  });
});
