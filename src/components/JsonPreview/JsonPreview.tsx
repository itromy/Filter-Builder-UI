import { JsonEditor } from 'json-edit-react';
import { transformFilterGroupsToJson } from '../../controller/transformFilters';
import { useFilterBuilderContext } from '../../context/FilterBuilderHook';
import transformJsonToFilterGroups from '../../controller/transformJson';

const JsonPreview = () => {
  const { data, setData } = useFilterBuilderContext();
  const jsonData = transformFilterGroupsToJson(data);

  // TODO: later edit single node, for now only whole tree

  const render = () => (
    <JsonEditor
      restrictEdit={(keyPath) => keyPath.key !== 'root'}
      restrictDelete={true}
      restrictAdd={true}
      setData={handleRootChange}
      data={jsonData}
    />
  );

  const handleRootChange = (newData: unknown) => {
    setData(transformJsonToFilterGroups(newData));
  };

  return render();
};

export default JsonPreview;
