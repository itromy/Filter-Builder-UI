export type Rule = {
  field: string;
  operator: string;
  value: string | number | boolean | Date;
};

export type QueryGroup = { and: (Rule | QueryGroup)[] } | { or: (Rule | QueryGroup)[] };
