import type { ConditionType } from '../components/Condition/ConditionTypes';
import type { GroupType } from '../components/Group/GroupTypes';
import type { QueryGroup, Rule } from '../models/JSONResult';

export function transformFilterGroupsToJson(groups: GroupType[]): QueryGroup | null {
  if (!groups || groups.length === 0) {
    return null;
  }

  // top level group
  return _transformGroup(groups[0]);
}

function _transformGroup(group: GroupType): QueryGroup {
  const rules: Rule[] = group.conditions.map(_mapConditionToRule);

  // transform nested groups
  const nestedGroups: QueryGroup[] = (group.groups || []).map((g) => _transformGroup(g));

  const items: (Rule | QueryGroup)[] = [...rules, ...nestedGroups];

  return group.operator === 'and' ? { and: items } : { or: items };
}

function _mapConditionToRule(condition: ConditionType): Rule {
  return {
    field: condition.field,
    operator: condition.operator,
    value: condition.value,
  };
}
