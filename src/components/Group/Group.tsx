import { useState, type JSX } from 'react';
import { GroupOperators, type GroupOperatorType, type GroupProps } from './GroupTypes';
import classes from './Group.module.css';
import Condition from '../Condition/Condition';
import { useFilterBuilderContext } from '../../context/FilterBuilderContext';

export default function Group(props: GroupProps) {
  const { groups, id } = props;
  const [operator, setOperator] = useState<GroupOperatorType>(GroupOperators.And);
  const [condtions, setConditions] = useState<JSX.Element[]>([]);
  const { addGroup } = useFilterBuilderContext();

  const render = () => {
    return (
      <div className={classes.group} key={id}>
        <div className={classes.header}>
          <select value={operator} onChange={changeGroupOperator}>
            <option value={GroupOperators.And}>AND</option>
            <option value={GroupOperators.Or}>OR</option>
          </select>

          <button onClick={handleAddGroup}>Add Group</button>
        </div>

        <div>
          <div className={classes.conditions}>
            <button className={classes.addCondtionButton} onClick={addCondition}>
              Add Conditon
            </button>
            {condtions}
          </div>
          {groups.map((childGroup) => (
            <Group
              id={childGroup.id}
              groups={childGroup.groups}
              conditions={childGroup.conditions}
            />
          ))}
        </div>
      </div>
    );
  };

  const changeGroupOperator = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setOperator(value as GroupOperatorType);
  };

  const handleAddGroup = () => {
    addGroup(id);
  };

  const addCondition = () => {
    setConditions((prev) => [...prev, <Condition index={prev.length} />]);
  };

  return render();
}
