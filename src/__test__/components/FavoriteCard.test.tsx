/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FavoriteCard from '../../components/Card/FavoriteCard';
import '@testing-library/jest-dom/extend-expect';

describe('the favorite card component', () => {
  it('should render correctly with headers', async () => {
    const { container } = render(
      <FavoriteCard
        header="Test"
        description="For testing"
        icon="SoilMoistureField"
      />
    );

    const headers = await screen.findAllByText('Test');
    expect(headers[0]).toHaveClass('fav-card-title-small');
    expect(headers[1]).toHaveClass('fav-card-title-large');
    expect(screen.getByText('For testing')).toBeInTheDocument();
    const icon = container.getElementsByClassName('fav-card-icon');
    expect(icon[0]).toBeInTheDocument();
  });

  it('should render card highlighted with different style', () => {
    const { container } = render(
      <FavoriteCard
        header="Test"
        description="For testing"
        icon="SoilMoistureField"
        highlighted
      />
    );

    expect(container.firstChild).not.toHaveClass('fav-card-main');
    expect(container.firstChild).toHaveClass('fav-card-main-highlighted');
  });

  it('should click in the button and open the options', () => {
    const { container } = render(
      <FavoriteCard
        header="Test"
        description="For testing"
        icon="SoilMoistureField"
      />
    );

    const buttonElement = container.getElementsByClassName('fav-card-overflow');
    fireEvent.click(buttonElement[0]);
    expect(screen.getByText('Highlight shortcut')).toBeInTheDocument();
    expect(screen.getByText('Delete shortcut')).toBeInTheDocument();
  });

  it('should close the dropdown menu when click outside', () => {
    const { container } = render(
      <FavoriteCard
        header="Test"
        description="For testing"
        icon="SoilMoistureField"
      />
    );

    const buttonElement = container.getElementsByClassName('fav-card-overflow');
    fireEvent.click(buttonElement[0]);
    fireEvent.click(document);
    expect(screen.queryByText('Highlight shortcut')).toBeNull();
    expect(screen.queryByText('Delete shortcut')).toBeNull();
  });
});
