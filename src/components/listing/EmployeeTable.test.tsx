import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock react-router hooks
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ search: '?role=admin' }),
  };
});

import EmployeeTable from './EmployeeTable';

describe('EmployeeTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header and empty state', () => {
    render(<EmployeeTable data={[]} role="admin" /> as any);

    expect(screen.getByText(/Employee Directory/i)).toBeInTheDocument();
    expect(screen.getByText(/No employees found/i)).toBeInTheDocument();
  });

  it('renders a row with photo when photo_url is present', () => {
    const data = [
      { employee_id: 'E1', full_name: 'Alice', department: 'Eng', role: 'Engineer', location: 'NYC', photo_url: 'http://img' },
    ];

    render(<EmployeeTable data={data as any} role="admin" />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    const img = screen.getByAltText('Alice') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('http://img/');
  });

  it('renders No Photo when photo_url is not present', () => {
    const data = [
      { employee_id: 'E2', full_name: 'Bob', department: 'HR', role: 'HR', location: 'LA' },
    ];

    render(<EmployeeTable data={data as any} role="admin" />);

    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText(/No Photo/i)).toBeInTheDocument();
  });

  it('navigates to wizard with current search when Add New Employee clicked', () => {
    render(<EmployeeTable data={[]} role="admin" /> as any);

    const btn = screen.getByRole('button', { name: /Add New Employee/i });
    fireEvent.click(btn);

    expect(navigateMock).toHaveBeenCalledWith('/wizard?role=admin');
  });
});
