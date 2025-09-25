import React from 'react';
import FilterBuilder from './components/FilterBuilder/FilterBuilder';
import FilterBuilderProvider from './context/FilterBuilderProvider';

function App() {
  return (
    <FilterBuilderProvider>
      <FilterBuilder />
    </FilterBuilderProvider>
  );
}

export default App;
