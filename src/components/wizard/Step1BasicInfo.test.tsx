import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

// 1. Mock the Service and Hooks BEFORE importing the component that uses them
vi.mock('../../services/employee.service', () => ({
  EmployeeService: {
    getDepartments: vi.fn(),
    getAllBasicInfo: vi.fn(),
  },
}));

// Mock the debounce to execute immediately for testing
vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value: any) => value,
}));

import Step1BasicInfo from './Step1BasicInfo';
import { EmployeeService } from '../../services/employee.service';

describe('Step1BasicInfo Component', () => {
  const mockOnChange = vi.fn();
  const mockOnNext = vi.fn();

  it('should fetch departments', async () => {
    // 2. Use vi.mocked to get access to mockResolvedValue
    const mockedGetDeps = vi.mocked(EmployeeService.getDepartments);
    
    mockedGetDeps.mockResolvedValue({
      data: [{ id: 1, name: 'Engineering' }],
    } as any);

    // ... rest of your test
  });
  

  it('renders correctly and button is initially disabled', () => {
    render(<Step1BasicInfo onChange={mockOnChange} onNext={mockOnNext} />);
    
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('shows error message for invalid email', () => {
    render(<Step1BasicInfo onChange={mockOnChange} onNext={mockOnNext} />);
    
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('enables the Next button only when all fields are valid', async () => {
    // Mock successful department fetch
    const mockDept = { id: 1, name: 'Engineering' };
    (EmployeeService.getDepartments as any).mockResolvedValue({ data: [mockDept] });
    (EmployeeService.getAllBasicInfo as any).mockResolvedValue({ data: [] });

    render(<Step1BasicInfo onChange={mockOnChange} onNext={mockOnNext} />);

    // Fill Name
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    
    // Fill Email
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });

    // Select Role
    fireEvent.change(screen.getByLabelText(/Designated Role/i), { target: { value: 'Admin' } });

    // Simulate Search and Select Department (triggers ID generation)
    const deptInput = screen.getByPlaceholderText(/Type to search.../i);
    fireEvent.change(deptInput, { target: { value: 'Eng' } });

    const suggestion = await screen.findByText('Engineering');
    fireEvent.click(suggestion);

    // Verify button is now enabled (wait for async state updates)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
    });
  });
});