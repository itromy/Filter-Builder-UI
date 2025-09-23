import { v4 as uuid } from 'uuid';
import { GroupOperators, type GroupType } from '../components/Group/GroupTypes';

export const getEmptyGroup = (): GroupType => ({
  id: uuid(),
  groups: [],
  conditions: [],
  operator: GroupOperators.And,
});

export const addGroup = (parentId: string, data: GroupType[]): GroupType[] => {
  return data.map((group) => {
    const newGroup: GroupType = { ...group, groups: [...group.groups] };

    if (group.id === parentId) {
      newGroup.groups.push(getEmptyGroup());
    } else {
      // child groups
      newGroup.groups = addGroup(parentId, newGroup.groups);
    }

    return newGroup;
  });
};

export const deleteGroup = (groupId: string, data: GroupType[]): GroupType[] => {
  return data
    .filter((group) => group.id !== groupId) // first level
    .map((group) => ({
      // child groups
      ...group,
      groups: deleteGroup(groupId, group.groups),
    }));
};

export const updateGroup = (
  groupId: string,
  updates: Partial<GroupType>,
  data: GroupType[]
): GroupType[] => {
  return data.map((group) => {
    if (group.id === groupId) {
      return {
        ...group,
        ...updates,
      };
    }
    // search in child groups
    return {
      ...group,
      groups: updateGroup(groupId, updates, group.groups),
    };
  });
};
