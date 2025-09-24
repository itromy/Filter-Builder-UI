import { JsonEditor as JsonEditReact } from 'json-edit-react';
import convertGroupsToJson from '../../converter/convertGroupsToJson';
import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import convertJsonToGroups from '../../converter/convertJsonToGroups';
import type { QueryGroup } from '../../models/JSONResult';

const JsonEditor = () => {
  const { data, setData } = useFilterBuilderContext();
  const jsonData = convertGroupsToJson(data);

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
    setData(convertJsonToGroups(newData));
  };

  return render();
};

export default JsonEditor;
