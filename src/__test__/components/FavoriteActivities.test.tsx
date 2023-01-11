/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoriteActivities from '../../components/FavoriteActivities/index';
import '@testing-library/jest-dom';

describe('Test the Favorite Activities component', () => {
  it('should render correctly', () => {
    render(
      <FavoriteActivities />
    );

    expect(screen.getByText('My favorite activities')).toBeInTheDocument();
  });

  it('should render 8 cards', () => {
    const { container } = render(
      <FavoriteActivities />
    );

    const cards = container.getElementsByClassName('card-main');
    expect(cards).toHaveLength(8);
  });
});
