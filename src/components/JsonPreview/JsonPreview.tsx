import { JsonEditor } from 'json-edit-react';
import { transformFilterGroupsToJson } from '../../controller/transformFilters';
import { useFilterBuilderContext } from '../../context/FilterBuilderHook';

const JsonPreview = () => {
  const jsonData = useFilterBuilderContext().data;
  const data = transformFilterGroupsToJson(jsonData);

  return <JsonEditor data={data}/>;
};

export default JsonPreview;
