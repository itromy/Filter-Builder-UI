import type { ConditionType } from '../components/Condition/ConditionTypes';
import { GroupOperators, type GroupType } from '../components/Group/GroupTypes';
import type { QueryGroup, Rule } from '../models/JSONResult';
import { v4 as uuid } from 'uuid';

export default function transformJsonToFilterGroups(json: QueryGroup): GroupType[] {
  if (!json) return [];

  return [_transformJsonGroup(json)];
}

function _transformJsonGroup(jsonGroup: QueryGroup): GroupType {
  let operator: GroupOperators;
  let items: (Rule | QueryGroup)[];

  if ('and' in jsonGroup) {
    operator = GroupOperators.And;
    items = jsonGroup.and;
  } else if ('or' in jsonGroup) {
    operator = GroupOperators.Or;
    items = jsonGroup.or;
  } else {
    throw new Error('Invalid JSON group');
  }

  const groupId = uuid();
  const conditions: ConditionType[] = [];
  const groups: GroupType[] = [];

  items.forEach((item) => {
    if (_isRule(item)) {
      conditions.push(_mapRuleToCondition(item as Rule, groupId));
    } else if (_isQueryGroup(item)) {
      groups.push(_transformJsonGroup(item as QueryGroup));
    } else {
      console.warn('Invalid item skipped', item);
    }
  });

  return {
    id: groupId,
    operator,
    conditions,
    groups,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _isRule(item: any): boolean {
  return 'field' in item && 'operator' in item && 'value' in item;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _isQueryGroup(item: any): item is QueryGroup {
  return item && typeof item === 'object' && ('and' in item || 'or' in item);
}

function _mapRuleToCondition(rule: Rule, parentId: string): ConditionType {
  return {
    id: uuid(),
    parentId,
    field: rule.field,
    operator: rule.operator,
    value: rule.value,
  };
}
