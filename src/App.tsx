import FilterBuilder from './components/FilterBuilder/FilterBuilder';
import FilterBuilderProvider from './context/FilterBuilderProvider';

function App() {
  return (
    <FilterBuilderProvider>
      <h1>Filter Builder</h1>
      <FilterBuilder />
    </FilterBuilderProvider>
  );
}

export default App;
