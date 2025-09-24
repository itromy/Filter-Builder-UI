import { useState, type ReactNode } from 'react';
import type { GroupType } from '../components/Group/GroupTypes';
import {
  getEmptyGroup,
  addGroup as addGroupController,
  deleteGroup as deleteGroupController,
  updateGroup as updateGroupController,
} from '../controller/groups';
import {
  addCondition as addConditionController,
  deleteCondition as deleteConditionController,
  updateCondition as updateConditionController,
} from '../controller/conditions';
import fields from '../config/fields.json';
import operators from '../config/operators.json';
import type { Operators } from '../models/Operator';
import { FilterBuilderContext } from './FilterBuilderContext';
import type { ConditionType } from '../components/Condition/ConditionTypes';

const FilterBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<GroupType[]>([getEmptyGroup()]);

  const addGroup = (parentId: string) => {
    setData((prev) => addGroupController(parentId, prev));
  };

  const deleteGroup = (id: string) => {
    setData((prev) => deleteGroupController(id, prev));
  };

  const updateGroup = (id: string, updates: Partial<GroupType>) => {
    setData((prev) => updateGroupController(id, updates, prev));
  };

  const addCondition = (parentId: string) => {
    setData((prev) => addConditionController(parentId, prev));
  };

  const deleteCondition = (parentId: string, id: string) => {
    setData((prev) => deleteConditionController(parentId, id, prev));
  };

  const updateCondition = (parentId: string, id: string, updates: Partial<ConditionType>) => {
    setData((prev) => updateConditionController(parentId, id, updates, prev));
  };

  // TODO: solve it better
  const usedOperators = operators as Operators;

  return (
    <FilterBuilderContext.Provider
      value={{
        data,
        setData,
        addGroup,
        deleteGroup,
        updateGroup,
        addCondition,
        deleteCondition,
        updateCondition,
        fields,
        operators: usedOperators,
      }}
    >
      {children}
    </FilterBuilderContext.Provider>
  );
};

export default FilterBuilderProvider;
