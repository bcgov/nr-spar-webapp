/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom';
import SeedlotRegistrarionForm from '../../views/Seedlot/SeedlotRegistrationForm';

describe('Collection Step test', () => {
  let dismount: Function;
  beforeEach(() => {
    const qc = new QueryClient();
    const { unmount } = render(
      <QueryClientProvider client={qc}>
        <BrowserRouter>
          <SeedlotRegistrarionForm />
        </BrowserRouter>
      </QueryClientProvider>
    );
    dismount = unmount;
  });

  afterEach(() => dismount());

  it('should have the correct labels', () => {
    const content = {
      title: 'Collector agency'
    }
    expect(screen.getByText(content.title)).toBeInTheDocument();
  });

  it('should call the checkbox click function', async () => {
    for (let checkbox of screen.getAllByRole('checkbox')) {
      fireEvent.click(checkbox);
      if (checkbox.id === 'applicant') {
        await waitFor(() => {
          expect(checkbox).not.toBeChecked();
        });
      } else {
        await waitFor(() => {
          expect(checkbox).toBeChecked();
        });
      }
    };
  });
});
