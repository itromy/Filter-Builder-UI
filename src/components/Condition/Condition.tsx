import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import classes from './Condition.module.css';
import { type ConditionProps } from './ConditionTypes';

export default function Condition(props: ConditionProps) {
  const { id, parentId } = props;
  const { deleteCondition, fields } = useFilterBuilderContext();

  const render = () => {
    return (
      <div key={id} className={classes.condition}>
        {renderField()}
        <button className={classes.deleteButton} onClick={handleDelelte}>
          Delete
        </button>
      </div>
    );
  };

  const renderField = () => {
    return (
      <label>
        Field
        <select>
          <option value="">Choose</option>
          {fields.map((field) => (
            <option value={field.value}>{field.label}</option>
          ))}
        </select>
      </label>
    );
  };

  const handleDelelte = () => {
    deleteCondition(parentId, id);
  };

  return render();
}
