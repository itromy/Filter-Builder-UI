import React from 'react';
import { render, screen } from '@testing-library/react';
import Condition from './Condition';
import FilterBuilderProvider from '../../context/FilterBuilderProvider';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('Condition Component', () => {
  it('renders the Delete button', () => {
    render(
      <FilterBuilderProvider>
        <Condition
          condition={{
            id: 'cond-1',
            parentId: 'parent-1',
            field: 'age',
            operator: 'equal',
            value: '30',
          }}
        />
      </FilterBuilderProvider>
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
