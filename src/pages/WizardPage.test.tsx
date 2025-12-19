import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock useSearchParams BEFORE importing the component
vi.mock('react-router-dom', () => ({
  useSearchParams: () => [new URLSearchParams('role=ops')],
}));

// Mock Wizard child to verify role prop is passed
vi.mock('../components/wizard/Wizard', () => ({
  default: (props: any) => <div data-testid="mock-wizard">Wizard role:{props.role}</div>,
}));

import WizardPage from './WizardPage';

describe('WizardPage', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders heading and displays current role from query param', () => {
    render(<WizardPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Add New Employee');
    expect(screen.getByText(/Current Role:/i)).toBeInTheDocument();
    // role displayed as uppercase
    expect(screen.getByText(/OPS/)).toBeInTheDocument();
  });

  it('renders Wizard component and passes role prop', () => {
    render(<WizardPage />);
    const wizard = screen.getByTestId('mock-wizard');
    expect(wizard).toHaveTextContent('Wizard role:ops');
  });
});
