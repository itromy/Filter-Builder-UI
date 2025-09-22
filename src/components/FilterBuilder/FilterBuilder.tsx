import { useFilterBuilderContext } from '../../context/FilterBuilderContext';
import Group from '../Group/Group';

export default function FilterBuilder() {
  const { data } = useFilterBuilderContext();

  return (
    <div>
      {data.map((group) => (
        <Group id={group.id} groups={group.groups} />
      ))}
    </div>
  );
}
