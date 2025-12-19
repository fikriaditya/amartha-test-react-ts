import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock EmployeeService BEFORE importing the component
vi.mock('../services/employee.service', () => ({
  EmployeeService: {
    getAllBasicInfo: vi.fn(),
    getAllDetails: vi.fn(),
  },
}));

// Mock child components to keep tests focused
vi.mock('../components/listing/EmployeeTable', () => ({
  default: (props: any) => (
    <div data-testid="employee-table">EmployeeTable:{JSON.stringify(props.data)}|role:{props.role}</div>
  ),
}));

vi.mock('../components/listing/Pagination', () => ({
  default: (props: any) => (
    <div data-testid="pagination">Pagination:{props.currentPage}-{props.totalPages}-{props.pageSize}</div>
  ),
}));

// Mock react-router useSearchParams
vi.mock('react-router-dom', () => ({
  useSearchParams: () => [new URLSearchParams('role=admin')],
}));

import { EmployeeService } from '../services/employee.service';
import EmployeeListPage from './EmployeeListPage';

describe('EmployeeListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('shows loading then renders merged employees and pagination', async () => {
    // prepare mock data: 15 employees so pagination shows 2 pages with pageSize 10
    const basic = Array.from({ length: 15 }).map((_, i) => ({ employee_id: `E${i}`, full_name: `Name${i}` }));
    const details = Array.from({ length: 15 }).map((_, i) => ({ employee_id: `E${i}`, employment_type: i % 2 === 0 ? 'Full-time' : 'Part-time' }));

    (EmployeeService.getAllBasicInfo as any).mockResolvedValue({ data: basic });
    (EmployeeService.getAllDetails as any).mockResolvedValue({ data: details });

    render(<EmployeeListPage />);

    // initial loading text
    expect(screen.getByText(/Syncing Employee Directory/i)).toBeInTheDocument();

    // wait for loading to finish
    await waitFor(() => expect(screen.queryByText(/Syncing Employee Directory/i)).toBeNull());

    // EmployeeTable should be rendered with merged data
    const table = screen.getByTestId('employee-table');
    expect(table).toBeInTheDocument();
    expect(table.textContent).toContain('E0');
    expect(table.textContent).toContain('Name0');

    // Pagination should reflect total pages = 2
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    expect(pagination.textContent).toContain('1-2-10');
  });

  it('renders empty table on fetch error and stops loading', async () => {
    (EmployeeService.getAllBasicInfo as any).mockRejectedValue(new Error('fail'));
    (EmployeeService.getAllDetails as any).mockRejectedValue(new Error('fail'));

    render(<EmployeeListPage />);

    // still shows loading initially
    expect(screen.getByText(/Syncing Employee Directory/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/Syncing Employee Directory/i)).toBeNull());

    // EmployeeTable should be rendered with empty array
    const table = screen.getByTestId('employee-table');
    expect(table.textContent).toContain('[]');
  });
});
