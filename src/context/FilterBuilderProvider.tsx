import { useState, type ReactNode } from 'react';
import type { GroupType } from '../components/Group/GroupTypes';
import {
  getEmptyGroup,
  addGroup as addGroupController,
  deleteGroup as deleteGroupController,
} from '../controller/groups';
import {
  addCondition as addConditionController,
  deleteCondition as deleteConditionController,
} from '../controller/conditions';
import fields from '../config/fields.json';
import operators from '../config/operators.json';
import type { Operators } from '../models/Operator';
import { FilterBuilderContext } from './FilterBuilderContext';

const FilterBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<GroupType[]>([getEmptyGroup()]);

  const addGroup = (parentId: string) => {
    setData((prev) => addGroupController(parentId, prev));
  };

  const deleteGroup = (id: string) => {
    setData((prev) => deleteGroupController(id, prev));
  };

  const addCondition = (parentId: string) => {
    setData((prev) => addConditionController(parentId, prev));
  };

  const deleteCondition = (parentId: string, id: string) => {
    setData((prev) => deleteConditionController(parentId, id, prev));
  };

  // TODO: solve it better
  const usedOperators = operators as Operators;

  return (
    <FilterBuilderContext.Provider
      value={{
        data,
        addGroup,
        deleteGroup,
        addCondition,
        deleteCondition,
        fields,
        operators: usedOperators,
      }}
    >
      {children}
    </FilterBuilderContext.Provider>
  );
};

export default FilterBuilderProvider;
