import { v4 as uuid } from 'uuid';
import type { GroupType } from '../components/Group/GroupTypes';

export const getEmptyGroup = (): GroupType => ({
  id: uuid(),
  groups: [],
  conditions: [],
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
