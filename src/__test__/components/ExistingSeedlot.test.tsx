/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ExistingSeedlot from '../../components/ExistingSeedlot';
import '@testing-library/jest-dom';

//TODO test Empty Section
describe('Existing Seedlot component', () => {
  it('should render title and subtitle correctly', () => {
    render(<ExistingSeedlot />);
    
    const description = screen.getAllByRole('heading', { level: 4 })
    expect(description[0].textContent).toEqual('Existing seedlot');
    expect(description[1].textContent).toEqual('Check a summary of your recent seedlots');
  });
});
