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
      newGroup.groups = addGroup(parentId, newGroup.groups);
    }

    return newGroup;
  });
};
