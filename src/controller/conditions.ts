import { v4 as uuid } from 'uuid';
import type { ConditionType } from '../components/Condition/ConditionTypes';
import type { GroupType } from '../components/Group/GroupTypes';

export const getEmptyCondition = (parentId: string): ConditionType => ({
  id: uuid(),
  parentId,
  field: '',
  operator: '',
  value: '',
});

export const addCondition = (parentId: string, data: GroupType[]): GroupType[] => {
  return data.map((group) => {
    if (group.id === parentId) {
      return {
        ...group,
        conditions: [...group.conditions, getEmptyCondition(parentId)],
      };
    }

    return {
      ...group,
      groups: addCondition(parentId, group.groups),
    };
  });
};

export const deleteCondition = (
  parentId: string,
  conditionId: string,
  data: GroupType[]
): GroupType[] => {
  return data.map((group) => {
    if (group.id === parentId) {
      return {
        ...group,
        conditions: group.conditions.filter((cond) => cond.id !== conditionId),
      };
    }

    return {
      ...group,
      groups: deleteCondition(parentId, conditionId, group.groups),
    };
  });
};

export const updateCondition = (
  parentId: string,
  conditionId: string,
  updates: Partial<ConditionType>,
  data: GroupType[]
): GroupType[] => {
  return data.map((group) => {
    if (group.id === parentId) {
      return {
        ...group,
        conditions: group.conditions.map((condition) =>
          condition.id === conditionId ? { ...condition, ...updates } : condition
        ),
      };
    }

    return {
      ...group,
      groups: updateCondition(parentId, conditionId, updates, group.groups),
    };
  });
};
