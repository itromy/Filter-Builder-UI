import type { ConditionType } from '../Condition/ConditionTypes';

export type GroupOperatorType = `${GroupOperators}`;

export enum GroupOperators {
  And = 'and',
  Or = 'or',
}

export type GroupType = {
  id: string;
  groups: GroupType[];
  conditions: ConditionType[];
  operator: GroupOperatorType;
};

export type GroupProps = GroupType & {
  disableDelete?: boolean;
};
