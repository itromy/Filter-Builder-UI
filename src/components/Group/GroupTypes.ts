import type { ConditionType } from '../Condition/ConditionTypes';

export type GroupOperatorType = 'and' | 'or';

export type GroupType = {
  id: string;
  groups: GroupType[];
  conditions: ConditionType[];
  operator: GroupOperatorType;
};

export type GroupProps = {
  group: GroupType;
  disableDelete?: boolean;
};
