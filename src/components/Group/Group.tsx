import { useState, type JSX } from 'react';
import { GroupOperators, type GroupOperatorType } from './GroupTypes';
import classes from './Group.module.css';
export default function Group() {
  const [operator, setOperator] = useState<GroupOperatorType>(GroupOperators.And);
  const [childGroups, setChildGroups] = useState<JSX.Element[]>([]);

  const addGroup = () => {
    setChildGroups((prev) => [...prev, <Group key={prev.length} />]);
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setOperator(value);
  };

  return (
    <div className={classes.group}>
      <div className={classes.header}>
        <select value={operator} onChange={handleOperatorChange}>
          <option value={GroupOperators.And}>AND</option>
          <option value={GroupOperators.Or}>OR</option>
        </select>

        <button onClick={addGroup}>Add Group</button>
      </div>

      <div>
        <div className={classes.conditions}>
          <button>Add Conditon</button>
        </div>

        {childGroups}
      </div>
    </div>
  );
}
