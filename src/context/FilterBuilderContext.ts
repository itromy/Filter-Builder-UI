import { createContext } from 'react';
import type { GroupType } from '../components/Group/GroupTypes';
import type { Operators, Field } from '../models/ConfigTypes';
import type { ConditionType } from '../components/Condition/ConditionTypes';

export interface FilterBuilderContextType {
  data: GroupType[];
  setData: (data: GroupType[]) => void;
  addGroup: (parentId: string) => void;
  deleteGroup: (deletedGroupId: string) => void;
  updateGroup: (id: string, updates: Partial<GroupType>) => void;
  addCondition: (parentId: string) => void;
  deleteCondition: (parentId: string, id: string) => void;
  updateCondition: (parentId: string, id: string, updates: Partial<ConditionType>) => void;
  fields: Field[];
  operators: Operators;
}

export const FilterBuilderContext = createContext<FilterBuilderContextType | undefined>(undefined);
