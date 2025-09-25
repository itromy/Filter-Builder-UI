import { type GroupOperatorType, type GroupProps } from './GroupTypes';
import classes from './Group.module.css';
import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import Condition from '../Condition/Condition';
import React from 'react';
export default function Group({ group, disableDelete }: GroupProps) {
  const { id, operator, groups, conditions } = group;
  const { addGroup, deleteGroup, updateGroup, addCondition } = useFilterBuilderContext();

  const render = () => {
    return (
      <div className={classes.groupOuter} key={id}>
        <div
          className={`${classes.groupInner} ${!groups.length && !conditions.length ? classes.emptyGroup : ''}`}
        >
          {renderHeader()}
          {renderButtons()}
          {renderConditions()}
          {renderNestedGroups()}
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className={classes.header}>
        <select value={operator} onChange={changeGroupOperator}>
          <option value="and">AND</option>
          <option value="or">OR</option>
        </select>
        <button
          className={classes.deleteGroup}
          onClick={handleDeleteGroup}
          disabled={disableDelete}
        >
          Delete Group
        </button>
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className={classes.buttons}>
        <button className={classes.addConditionButton} onClick={handleAddCondition}>
          Add Condition
        </button>
        <button className={classes.addGroupButton} onClick={handleAddGroup}>
          Add Group
        </button>
      </div>
    );
  };

  const renderConditions = () => {
    return (
      <>
        {conditions.length ? (
          conditions.map((condition) => (
            <div className={classes.treeNode} key={condition.id}>
              <Condition condition={condition} />
            </div>
          ))
        ) : (
          <p>No Conditions yet</p>
        )}
      </>
    );
  };

  const renderNestedGroups = () => {
    return (
      <>
        {groups.map((childGroup) => (
          <div className={classes.treeNode} key={childGroup.id}>
            <Group group={childGroup} disableDelete={false} />
          </div>
        ))}
      </>
    );
  };

  const changeGroupOperator = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateGroup(id, {
      operator: e.target.value as GroupOperatorType,
    });
  };

  const handleAddGroup = () => addGroup(id);

  const handleDeleteGroup = () => deleteGroup(id);

  const handleAddCondition = () => addCondition(id);

  return render();
}
