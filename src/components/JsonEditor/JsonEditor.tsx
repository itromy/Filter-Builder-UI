import { JsonEditor as JsonEditReact } from 'json-edit-react';
import { transformFilterGroupsToJson } from '../../controller/transformFilters';
import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import transformJsonToFilterGroups from '../../controller/transformJson';
import type { QueryGroup } from '../../models/JSONResult';

const JsonEditor = () => {
  const { data, setData } = useFilterBuilderContext();
  const jsonData = transformFilterGroupsToJson(data);

  // TODO: later edit single node, for now only whole tree

  const render = () => (
    <JsonEditReact
      restrictEdit={(keyPath) => keyPath.key !== 'root'}
      restrictDelete={true}
      restrictAdd={true}
      setData={handleRootChange}
      data={jsonData}
    />
  );

  const handleRootChange = (newData: QueryGroup) => {
    setData(transformJsonToFilterGroups(newData));
  };

  return render();
};

export default JsonEditor;
