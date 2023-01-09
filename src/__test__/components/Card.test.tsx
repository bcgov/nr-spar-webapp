/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../../components/Card/index';

describe('Test the card component', () => {
  it('should render correctly', () => {
    render(
      <Card
        header="Test"
        description="For testing"
        icon="SoilMoistureField"
      />
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
