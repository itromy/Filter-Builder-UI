export type ConditionProps = {
  id: string;
  parentId: string;
};

export type ConditionType = {
  id: string;
  parentId: string;
  field: string;
  operator: string;
  values: number[] | string[] | Date[];
};
