import { render, screen } from '@testing-library/react';
import Condition from './Condition';
import FilterBuilderProvider from '../../context/FilterBuilderProvider';
import '@testing-library/jest-dom';

describe('Condition Component', () => {
  it('renders the Delete button', () => {
    render(
      <FilterBuilderProvider>
        <Condition id="1" parentId="root" />
      </FilterBuilderProvider>
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
