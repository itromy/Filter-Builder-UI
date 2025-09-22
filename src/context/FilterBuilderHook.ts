import { useContext } from 'react';
import { FilterBuilderContext, type FilterBuilderContextType } from './FilterBuilderContext';

export const useFilterBuilderContext = (): FilterBuilderContextType => {
  const context = useContext(FilterBuilderContext);

  if (!context) {
    throw new Error('useFilterBuilderContext must be used within a FilterBuilderProvider');
  }

  return context;
};
