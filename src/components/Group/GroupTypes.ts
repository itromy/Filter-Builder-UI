import type { ConditionProps } from '../Condition/ConditionTypes';

export type GroupOperatorType = `${GroupOperators}`;

export enum GroupOperators {
  And = 'and',
  Or = 'or',
}

export type GroupType = {
  id: string;
  groups: GroupType[];
  conditions: ConditionProps[];
};

export type GroupProps = GroupType;
