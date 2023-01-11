/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../../components/Card/index';
import '@testing-library/jest-dom/extend-expect';

describe('Test the card component', () => {
  it('should render correctly with headers', async () => {
    render(
      <Card
        header="Test"
        description="For testing"
        icon="SoilMoistureField"
      />
    );

    const headers = await screen.findAllByText('Test');
    expect(headers[0]).toHaveClass('card-title__small');
    expect(headers[1]).toHaveClass('card-title__large');
  });
});

describe('Test when card is highlighted', () => {
  it('should render card highlighted with different style', async () => {
    render(
      <Card
        header="Test"
        description="For testing"
        icon="SoilMoistureField"
        highlighted
      />
    );

    const headers = await screen.findAllByText('Test');
    expect(headers[0]).toHaveStyle('color: white');
  });
});
