import { createContext } from 'react';
import type { GroupType } from '../components/Group/GroupTypes';
import type { Field } from '../models/Field';
import type { Operators } from '../models/Operator';

export interface FilterBuilderContextType {
  data: GroupType[];
  addGroup: (parentId: string) => void;
  deleteGroup: (deletedGroupId: string) => void;
  addCondition: (parentId: string) => void;
  deleteCondition: (parentId: string, id: string) => void;
  fields: Field[];
  operators: Operators;
}

export const FilterBuilderContext = createContext<FilterBuilderContextType | undefined>(undefined);
