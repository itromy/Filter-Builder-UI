export type Field = {
  label: string;
  value: string;
  type: string;
};

export type StringOperators = 'equals' | 'not_equals' | 'contains' | 'starts_with';
export type NumberOperators = 'equals' | 'not_equals' | 'greater_than' | 'less_than';
export type DateOperators = 'before' | 'after' | 'on';
export type BooleanOperators = 'is_true' | 'is_false';

export type Operators = {
  string?: StringOperators[];
  number?: NumberOperators[];
  date?: DateOperators[];
  boolean?: BooleanOperators[];
};
