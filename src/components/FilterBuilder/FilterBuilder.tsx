import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import Group from '../Group/Group';
import JsonPreview from '../JsonPreview/JsonPreview';
import classes from './FilterBuilder.module.css';
export default function FilterBuilder() {
  const { data } = useFilterBuilderContext();

  return (
    <div className={classes.outer}>
      <h1>Filter Builder UI</h1>
      <div className={classes.filterBuilder}>
        <div className={classes.left}>
          {data.map((group, index) => (
            <Group key={group.id} group={group} disableDelete={index === 0} />
          ))}
        </div>
        <div className={classes.right}>
          <JsonPreview />
        </div>
      </div>
    </div>
  );
}
