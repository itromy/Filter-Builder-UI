import { useState } from 'react';
import { GroupOperators, type GroupOperatorType, type GroupProps } from './GroupTypes';
import classes from './Group.module.css';
import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import Condition from '../Condition/Condition';

export default function Group(props: GroupProps) {
  const { groups, id, conditions, disableDelete } = props;
  const [operator, setOperator] = useState<GroupOperatorType>(GroupOperators.And);
  const { addGroup, deleteGroup, updateGroup, addCondition } = useFilterBuilderContext();

  const render = () => {
    return (
      <div className={classes.group} key={id}>
        <div className={classes.header}>
          <select value={operator} onChange={changeGroupOperator}>
            <option value={GroupOperators.And}>AND</option>
            <option value={GroupOperators.Or}>OR</option>
          </select>
          <button onClick={handleDeleteGroup} disabled={disableDelete}>
            Delete
          </button>
        </div>

        <div>
          <div className={classes.conditions}>
            <button className={classes.addConditionButton} onClick={handleAddCondition}>
              Add Conditon
            </button>
            {conditions.length ? (
              conditions.map((condition) => <Condition id={condition.id} parentId={id} />)
            ) : (
              <p>No Conditions yet</p>
            )}
          </div>
          {groups.map((childGroup) => (
            <Group
              id={childGroup.id}
              operator={childGroup.operator}
              groups={childGroup.groups}
              conditions={childGroup.conditions}
            />
          ))}

          <button className={classes.addGroupButton} onClick={handleAddGroup}>
            Add Group
          </button>
        </div>
      </div>
    );
  };

  const changeGroupOperator = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setOperator(value as GroupOperatorType);
    updateGroup(id, {
      operator: value as GroupOperatorType,
    });
  };

  const handleAddGroup = () => {
    addGroup(id);
  };

  const handleDeleteGroup = () => {
    deleteGroup(id);
  };

  const handleAddCondition = () => {
    addCondition(id);
  };

  return render();
}
