import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies BEFORE importing the component
vi.mock('../../services/employee.service', () => ({
  EmployeeService: {
    getLocations: vi.fn(),
  },
}));

vi.mock('../../core/utils/fileConverter', () => ({
  convertToBase64: vi.fn(async () => 'data:image/png;base64,TEST'),
}));

vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value: any) => value,
}));

import Step2Details from './Step2Details';
import { EmployeeService } from '../../services/employee.service';

describe('Step2Details Component', () => {
  const mockOnChange = vi.fn();
  const mockOnBack = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders fields', () => {
    render(
      <Step2Details
        showBackButton={true}
        employee_id="EMP-123"
        onChange={mockOnChange}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByLabelText(/Employee Photo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Employment Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Notes/i)).toBeInTheDocument();
  });

  it('enables submit and calls onSubmit with filled data', async () => {
    // mock location lookup
    (EmployeeService.getLocations as any).mockResolvedValue({ data: [{ id: 1, name: 'NYC' }] });

    render(
      <Step2Details
        showBackButton={true}
        employee_id="EMP-123"
        onChange={mockOnChange}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />
    );

    // Upload photo (convertToBase64 is mocked to return a base64 string)
    const file = new File(['dummy'], 'photo.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/Employee Photo/i) as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for preview image (convertToBase64 is async)
    await screen.findByAltText('Preview');

    // Select employment type and wait for value to be applied
    const select = screen.getByLabelText(/Employment Type/i) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'Full-time' } });
    await waitFor(() => expect(select.value).toBe('Full-time'));

    // Search and pick location (component triggers lookup when length > 2)
    const locInput = screen.getByPlaceholderText(/Search locations.../i) as HTMLInputElement;
    fireEvent.change(locInput, { target: { value: 'New' } });

    const suggestion = await screen.findByText('NYC');
    fireEvent.click(suggestion);

    // Wait for location value to be applied
    await waitFor(() => expect((screen.getByPlaceholderText(/Search locations.../i) as HTMLInputElement).value).toBe('NYC'));

    // Wait for async state updates and the submit button to become enabled
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /submit application/i })).not.toBeDisabled();
    });

    // Submit and assert
    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    const submitted = mockOnSubmit.mock.calls[0][0];
    expect(submitted).toMatchObject({
      employee_id: 'EMP-123',
      employment_type: 'Full-time',
      location: 'NYC',
      photo_url: expect.stringContaining('data:image/png;base64'),
    });
  });
});
