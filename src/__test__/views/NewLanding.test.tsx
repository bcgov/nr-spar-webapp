/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NewLanding from '../../views/NewLanding';
import { AuthProvider } from '../../contexts/AuthContext';

describe('NewLanding component test', () => {
  it('should have the correct title', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <NewLanding />
        </AuthProvider>
      </BrowserRouter>
    );

    screen.getByRole('heading', { name: /Welcome.* SPAR/ });
    screen.getByRole('heading', { name: 'Seed Planning and Registry Application' });
    screen.getByRole('button', { name: /(login)?idir/i });
    screen.getByRole('button', { name: /(login)?bceid/i });

    // Image is decorative.
    screen.getByRole('img', { name: '' });
  });

  it('should match the snapshot', () => {
    const newLanding = renderer
      .create(
        <BrowserRouter>
          <AuthProvider>
            <NewLanding />
          </AuthProvider>
        </BrowserRouter>
      ).toJSON();

    expect(newLanding).toMatchSnapshot();
  });
});
