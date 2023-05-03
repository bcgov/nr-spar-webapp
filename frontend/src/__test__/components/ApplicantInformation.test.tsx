/* eslint-disable no-undef */
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import ApplicantInformation from '../../components/ApplicantInformation/index';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Test the Form Progress component', () => {
  it('should render correctly', () => {
    const qc = new QueryClient();
    render(
      <BrowserRouter>
        <QueryClientProvider client={qc}>
          <ApplicantInformation />
        </QueryClientProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Applicant agency')).toBeInTheDocument();
    expect(screen.getByText('Enter the applicant agency information')).toBeInTheDocument();
  })

});
