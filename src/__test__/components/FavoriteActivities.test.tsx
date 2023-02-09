/* eslint-disable no-undef */
import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import FavoriteActivities from '../../components/FavoriteActivities/index';
import '@testing-library/jest-dom';
import makeServer from '../../mock-api/server';

jest.setTimeout(10000);

// empty section should be tested in the future
describe('the Favorite Activities component', () => {
  beforeAll(() => {
    makeServer('test');
  });

  it('should render correctly', () => {
    const { container } = render(
      <FavoriteActivities />
    );

    expect(screen.getByText('My favorite activities')).toBeInTheDocument();
    expect(screen.getByText('Quick access to your favorite activities.')).toBeInTheDocument();
    expect(container.getElementsByTagName('svg')).toBeDefined();
  });

  it('should render exactly 8 cards', async () => {
    const { container } = render(
      <FavoriteActivities />
    );

    const cards = container.getElementsByClassName('fav-card-main');
    await waitFor(() => {
      expect(cards).toHaveLength(8);
    });
  });

  it('should delete the card', async () => {
    const { container } = render(
      <FavoriteActivities />
    );

    const cards = container.getElementsByClassName('fav-card-main');
    const buttonElement = container.getElementsByClassName('fav-card-overflow');
    await waitFor(() => {
      fireEvent.click(buttonElement[3]);
    });
    const deleteButton = screen.getByText('Delete shortcut');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(cards).toHaveLength(7);
    });
  });

  it('should highlight the card', async () => {
    const { container } = render(
      <FavoriteActivities />
    );

    const buttonElement = container.getElementsByClassName('fav-card-overflow');
    await waitFor(() => {
      fireEvent.click(buttonElement[1]);
    });
    const highlightButton = screen.getByText('Highlight shortcut');
    fireEvent.click(highlightButton);
    const highlightedCard = container.getElementsByClassName('fav-card-main-highlighted');
    await waitFor(() => {
      expect(highlightedCard).toHaveLength(1);
    });
  });
});
