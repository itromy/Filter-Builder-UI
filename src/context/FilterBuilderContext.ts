import { createContext } from 'react';
import type { GroupType } from '../components/Group/GroupTypes';

export interface FilterBuilderContextType {
  data: GroupType[];
  addGroup: (parentId: string) => void;
}

export const FilterBuilderContext = createContext<FilterBuilderContextType | undefined>(undefined);
