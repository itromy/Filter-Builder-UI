import { useState, type JSX } from 'react';
import { GroupOperators, type GroupOperatorType } from './GroupTypes';
import classes from './Group.module.css';
import Condition from '../Condition/Condition';
export default function Group() {
  const [operator, setOperator] = useState<GroupOperatorType>(GroupOperators.And);
  const [childGroups, setChildGroups] = useState<JSX.Element[]>([]);
  const [condtions, setConditions] = useState<JSX.Element[]>([]);

  const render = () => {
    return (
      <div className={classes.group}>
        <div className={classes.header}>
          <select value={operator} onChange={changeGroupOperator}>
            <option value={GroupOperators.And}>AND</option>
            <option value={GroupOperators.Or}>OR</option>
          </select>

          <button onClick={addGroup}>Add Group</button>
        </div>

        <div>
          <div className={classes.conditions}>
            <button className={classes.addCondtionButton} onClick={addCondition}>
              Add Conditon
            </button>

            {condtions}
          </div>
          {childGroups}
        </div>
      </div>
    );
  };

  const changeGroupOperator = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setOperator(value);
  };

  const addGroup = () => {
    setChildGroups((prev) => [...prev, <Group key={prev.length} />]);
  };

  const addCondition = () => {
    setConditions((prev) => [...prev, <Condition key={prev.length} />]);
  };

  return render();
}
