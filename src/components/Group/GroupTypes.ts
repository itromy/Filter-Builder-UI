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
  operator: GroupOperatorType;
};

export type GroupProps = GroupType & {
  disableDelete?: boolean;
};
