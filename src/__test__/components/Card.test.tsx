/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('should render card highlighted with different style', () => {
    const { container } = render(
      <Card
        header="Test"
        description="For testing"
        icon="SoilMoistureField"
        highlighted
      />
    );

    expect(container.firstChild).not.toHaveClass('card-main');
    expect(container.firstChild).toHaveClass('card-main-highlighted');
  });

  it('should click in the button', () => {
    const { container } = render(
      <Card
        header="Test"
        description="For testing"
        icon="SoilMoistureField"
      />
    );

    const buttonElement = container.getElementsByClassName('card-overflow');
    fireEvent.click(buttonElement[0]);
    expect(screen.getByText('Delete shortcut')).toBeInTheDocument();
  });
});
