import { useEffect, useRef, useState } from 'react';
import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import classes from './Condition.module.css';
import { type ConditionType } from './ConditionTypes';

export default function Condition({ condition }: { condition: ConditionType }) {
  const { deleteCondition, fields, operators, updateCondition } = useFilterBuilderContext();
  const [currentCondition, setCurrentCondition] = useState<ConditionType>(condition);
  const prevConditionRef = useRef<ConditionType | null>(null);

  useEffect(() => {
    const prevCondition = prevConditionRef.current;

    // only trigger change when it really changed (avoid loop)
    if (
      !prevCondition ||
      prevCondition.field !== currentCondition.field ||
      prevCondition.operator !== currentCondition.operator ||
      prevCondition.value !== currentCondition.value
    ) {
      updateCondition(currentCondition.parentId, currentCondition.id, {
        ...currentCondition,
      });
    }

    prevConditionRef.current = currentCondition;
  });

  const render = () => {
    return (
      <div key={currentCondition.id} className={classes.condition}>
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
        <select value={currentCondition.field} onChange={handleChangeField}>
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
    const isDisabled = currentCondition.field === '';
    const availableOperators = getOperatorsForField(currentCondition.field);

    return (
      <label>
        Operator
        <select
          disabled={isDisabled}
          value={currentCondition.operator}
          onChange={handleChangeOperator}
        >
          <option value="">Choose</option>
          {availableOperators.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </label>
    );
  };

  const renderValueFields = () => {
    const fieldObj = fields.find((f) => f.value === currentCondition.field);
    if (!fieldObj) return null;

    switch (fieldObj.type) {
      case 'string':
        return (
          <input
            type="text"
            value={(currentCondition.value as string) || ''}
            onChange={(e) => handleValueChange(e.target.value)}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={(currentCondition.value as number) || ''}
            onChange={(e) => handleValueChange(Number(e.target.value))}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={(currentCondition.value as string) || ''}
            onChange={(e) => handleValueChange(e.target.value)}
          />
        );
      case 'boolean':
        return (
          <select
            value={
              currentCondition.value === true
                ? 'true'
                : currentCondition.value === false
                  ? 'false'
                  : ''
            }
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

  const getOperatorsForField = (field: string): string[] => {
    if (!field) return [];

    const fieldObj = fields.find((f) => f.value === field);

    if (!fieldObj) return [];

    return operators[fieldObj.type as keyof typeof operators] ?? [];
  };

  const handleChangeField = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCondition({
      ...currentCondition,
      field: event.target.value,
    });
  };

  const handleChangeOperator = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCondition({
      ...currentCondition,
      operator: event.target.value,
    });
  };

  const handleDelete = () => deleteCondition(currentCondition.parentId, currentCondition.id);

  const handleValueChange = (value: string | Date | boolean | number) => {
    setCurrentCondition({
      ...currentCondition,
      value,
    });
  };

  return render();
}
