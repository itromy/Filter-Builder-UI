import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import classes from './Condition.module.css';
import { type ConditionProps } from './ConditionTypes';

export default function Condition(props: ConditionProps) {
  const { id, parentId } = props;
  const { deleteCondition } = useFilterBuilderContext();

  const render = () => {
    return (
      <div key={id} className={classes.condition}>
        Condition
        <button className={classes.deleteButton} onClick={handleDelelte}>
          Delete
        </button>
      </div>
    );
  };

  const handleDelelte = () => {
    deleteCondition(parentId, id);
  };

  return render();
}
