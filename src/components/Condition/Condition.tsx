import { useState } from 'react';
import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import classes from './Condition.module.css';
import { type ConditionType, type ConditionProps } from './ConditionTypes';

export default function Condition(props: ConditionProps) {
  const { id, parentId } = props;
  const { deleteCondition, fields, operators } = useFilterBuilderContext();
  const [condition, setCondition] = useState<ConditionType>({
    id: id,
    parentId: parentId,
    field: '',
    values: [],
    operator: '',
  });

  const render = () => {
    return (
      <div key={id} className={classes.condition}>
        {renderField()}
        {renderOperator()}
        {renderValueFields()}
        <button className={classes.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    );
  };

  const renderField = () => {
    return (
      <label>
        Field
        <select onChange={handleChangeField}>
          <option value="">Choose</option>
          {fields.map((field) => (
            <option key={field.value} value={field.value}>{field.label}</option>
          ))}
        </select>
      </label>
    );
  };

  const renderOperator = () => {
    const isDisabled = condition.field === '';
    const operators = getOperatorsForField(condition.field);

    // TODO: add labels for operators
    return (
      <label>
        Operator
        <select disabled={isDisabled} onChange={handleChangeOperator}>
          <option value="">Choose</option>
          {operators.map((operator) => (
            <option value={operator}>{operator}</option>
          ))}
        </select>
      </label>
    );
  };

  const getOperatorsForField = (field: string): string[] => {
    if (!field) return [];

    const fieldObj = fields.find((f) => f.value === field);

    if (!fieldObj) return [];

    return operators[fieldObj.type as keyof typeof operators] ?? [];
  };

  const renderValueFields = () => {
    const fieldObj = fields.find((f) => f.value === condition.field);

    if (!fieldObj) return <></>;

    const { type } = fieldObj;
    const { operator } = condition;

    switch (type) {
      case 'string':
        return <input type="text" value={condition.values[0] as string || ''} />;
      case 'number':
        if (operator === 'between') {
          return (
            <>
              <input type="number"></input> and
              <input type="number"></input>
            </>
          );
        }

        return <input type="number"></input>;
      case 'date':
        return <input type="date"></input>;
      default:
        return <></>;
    }
  };

  const handleChangeField = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition({
      ...condition,
      field: event.target.value,
    });
  };

  const handleChangeOperator = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition({
      ...condition,
      operator: event.target.value,
    });
  };

  const handleDelete = () => {
    deleteCondition(parentId, id);
  };

  return render();
}
