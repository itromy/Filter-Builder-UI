import { GroupOperators, type GroupOperatorType, type GroupProps } from './GroupTypes';
import classes from './Group.module.css';
import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import Condition from '../Condition/Condition';

export default function Group(props: GroupProps) {
  const { groups, id, conditions, disableDelete, operator } = props;
  const { addGroup, deleteGroup, updateGroup, addCondition } = useFilterBuilderContext();

  const render = () => {
    return (
      <div className={classes.groupOuter} key={id}>
        <div
          className={`${classes.groupInner} ${!groups.length && !conditions.length ? classes.emptyGroup : ''}`}
        >
          {renderHeader()}
          {renderButtons()}
          {renderCondtions()}
          {renderNestedGroups()}
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className={classes.header}>
        <select value={operator} onChange={changeGroupOperator}>
          <option value={GroupOperators.And}>AND</option>
          <option value={GroupOperators.Or}>OR</option>
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
          Add Conditon
        </button>
        <button className={classes.addGroupButton} onClick={handleAddGroup}>
          Add Group
        </button>
      </div>
    );
  };

  const renderCondtions = () => {
    return (
      <>
        {conditions.length ? (
          conditions.map((condition) => (
            <div className={classes.treeNode}>
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
          <div className={classes.treeNode}>
            <Group
              id={childGroup.id}
              operator={childGroup.operator}
              groups={childGroup.groups}
              conditions={childGroup.conditions}
            />
          </div>
        ))}
      </>
    );
  };

  const changeGroupOperator = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    updateGroup(id, {
      operator: value as GroupOperatorType,
    });
  };

  const handleAddGroup = () => addGroup(id);

  const handleDeleteGroup = () => deleteGroup(id);

  const handleAddCondition = () => addCondition(id);

  return render();
}
