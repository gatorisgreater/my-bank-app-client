import React from 'react';
import { render, screen } from '@testing-library/react';
import ApplicationForm from './ApplicationForm';

test('renders application form', () => {
  render(<ApplicationForm />);
  
  expect(screen.getByText(/Application Form/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Address Line 1/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/City/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/State \(e\.g\., NY\)/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/SSN \(9 digits\)/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Date of Birth \(YYYY-MM-DD\)/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
});