import { useState, type ReactNode } from 'react';
import type { GroupType } from '../components/Group/GroupTypes';
import { getEmptyGroup, addGroup as addGroupProvider } from '../controller/groups';
import { FilterBuilderContext } from './FilterBuilderContext';

const FilterBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<GroupType[]>([getEmptyGroup()]);

  const addGroup = (parentId: string) => {
    setData((prev) => addGroupProvider(parentId, prev));
  };

  return (
    <FilterBuilderContext.Provider value={{ data, addGroup }}>
      {children}
    </FilterBuilderContext.Provider>
  );
};

export default FilterBuilderProvider;
