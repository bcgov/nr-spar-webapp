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
});
