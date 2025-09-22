import classes from './Condition.module.css';
import { type ConditionProps } from './ConditionTypes';

export default function Condition(props: ConditionProps) {
  const { index } = props;

  function render() {
    return (
      <div key={index} className={classes.condition}>
        Condition {index + 1}
        <button className={classes.deleteButton}>Delete</button>
      </div>
    );
  }

  return render();
}
