import { useEffect, useRef, useState } from 'react';
import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import classes from './Condition.module.css';
import { type ConditionType, type ConditionProps } from './ConditionTypes';

export default function Condition(props: ConditionProps) {
  const { id, parentId } = props;
  const { deleteCondition, fields, operators, updateCondition } = useFilterBuilderContext();
  const [condition, setCondition] = useState<ConditionType>({
    id: id,
    parentId: parentId,
    field: '',
    value: '',
    operator: '',
  });
  const prevConditionRef = useRef<ConditionType | null>(null);

  useEffect(() => {
    const prevCondition = prevConditionRef.current;

    // only trigger change when it really changed (avoid loop)
    if (
      !prevCondition ||
      prevCondition.field !== condition.field ||
      prevCondition.operator !== condition.operator ||
      prevCondition.value !== condition.value
    ) {
      updateCondition(parentId, id, {
        field: condition.field,
        operator: condition.operator,
        value: condition.value,
      });
    }

    prevConditionRef.current = condition;
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
            <option key={field.value} value={field.value}>
              {field.label}
            </option>
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
    if (!fieldObj) return null;

    const { type } = fieldObj;

    switch (type) {
      case 'string':
        return (
          <input
            type="text"
            value={(condition.value as string) || ''}
            onChange={(e) => handleValueChange(e.target.value)}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={(condition.value as number) || ''}
            onChange={(e) => handleValueChange(Number(e.target.value))}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={(condition.value as string) || ''}
            onChange={(e) => handleValueChange(new Date(e.target.value))}
          />
        );

      case 'boolean':
        return (
          <select
            value={String(condition.value) || ''}
            onChange={(e) => handleValueChange(e.target.value === 'true')}
          >
            <option value="">Choose</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );

      default:
        return null;
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

  const handleValueChange = (value: string | Date | boolean | number) => {
    setCondition({
      ...condition,
      value,
    });
  };

  return render();
}
