import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import Group from '../Group/Group';

export default function FilterBuilder() {
  const { data } = useFilterBuilderContext();

  return (
    <div>
      {data.map((group, index) => (
        <Group
          id={group.id}
          operator={group.operator}
          groups={group.groups}
          conditions={group.conditions}
          disableDelete={index === 0}
        />
      ))}
    </div>
  );
}
