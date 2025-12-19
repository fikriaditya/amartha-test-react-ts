import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

import Pagination from './Pagination';

describe('Pagination component', () => {
  it('renders with correct initial values', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        pageSize={10}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    );

    expect(screen.getByLabelText(/Rows per page:/i)).toBeInTheDocument();
    const select = screen.getByLabelText(/Rows per page:/i) as HTMLSelectElement;
    expect(select.value).toBe('10');

    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.value).toBe('2');

    expect(screen.getByText(/of 5/i)).toBeInTheDocument();
  });

  it('calls onPageSizeChange when selecting a new page size', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        pageSize={5}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    );

    const select = screen.getByLabelText(/Rows per page:/i) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: '25' } });

    expect(onPageSizeChange).toHaveBeenCalledWith(25);
  });

  it('previous/next buttons enable/disable correctly and call onPageChange', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    // middle page
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        pageSize={10}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    );

    const prevBtn = screen.getByTitle('Previous Page') as HTMLButtonElement;
    const nextBtn = screen.getByTitle('Next Page') as HTMLButtonElement;

    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    fireEvent.click(prevBtn);
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables prev on first page and next on last page', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    // first page
    const { rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={3}
        pageSize={10}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    );

    const prevBtn = screen.getByTitle('Previous Page') as HTMLButtonElement;
    const nextBtn = screen.getByTitle('Next Page') as HTMLButtonElement;
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    // last page
    rerender(
      <Pagination
        currentPage={3}
        totalPages={3}
        pageSize={10}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    );

    expect(screen.getByTitle('Next Page')).toBeDisabled();
  });

  it('accepts valid page input and ignores invalid values', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        pageSize={10}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    );

    const input = screen.getByRole('spinbutton') as HTMLInputElement;

    // valid
    fireEvent.change(input, { target: { value: '4' } });
    expect(onPageChange).toHaveBeenCalledWith(4);

    // invalid (0)
    onPageChange.mockClear();
    fireEvent.change(input, { target: { value: '0' } });
    expect(onPageChange).not.toHaveBeenCalled();

    // invalid (> totalPages)
    fireEvent.change(input, { target: { value: '10' } });
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
