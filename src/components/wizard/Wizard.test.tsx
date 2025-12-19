import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Prepare mutable mocks that the module factory will capture
let submitMock = vi.fn(async () => true);
let isSubmittingFlag = false;

// Mock hooks and utilities BEFORE importing the component
vi.mock('../../hooks/useAutosave', () => ({
  useAutosave: (data: any, role: any) => {
    // no-op in tests
  },
}));

vi.mock('../../hooks/useSubmitWizard', () => ({
  useSubmitWizard: () => ({
    submit: submitMock,
    logs: [],
    get isSubmitting() {
      return isSubmittingFlag;
    },
    get logsRef() {
      return [];
    }
  }),
}));

vi.mock('../../core/constant/storage', () => ({
  getDraftKeyByRole: (role: string) => `draft-${role}`,
}));

// Mock react-router hooks
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ search: '?p=1' }),
  };
});

// Mock child components to keep the test focused on Wizard logic
vi.mock('./Step1BasicInfo', () => ({
  default: (props: any) => (
    <div>
      <div>MockStep1</div>
      <button onClick={() => props.onNext({ full_name: 'John', employee_id: 'EMP-1' })}>Mock Next</button>
      <button onClick={() => props.onChange({ full_name: 'Changed' })}>Mock Change</button>
    </div>
  ),
}));

vi.mock('./Step2Details', () => ({
  default: (props: any) => (
    <div>
      <div>MockStep2</div>
      {props.showBackButton && <button onClick={() => props.onBack()}>Mock Back</button>}
      <button onClick={() => props.onSubmit({ employee_id: props.employee_id || 'EMP-1', employment_type: 'Full-time', location: 'NYC' })}>Mock Submit</button>
    </div>
  ),
}));

vi.mock('../ui/SubmissionProgress', () => ({
  default: (props: any) => <div>Submitting...{props.logs?.length ?? 0}</div>,
}));

import Wizard from './Wizard';

describe('Wizard component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // reset defaults
    submitMock = vi.fn(async () => true);
    isSubmittingFlag = false;
    // clear localStorage
    localStorage.clear();
  });

  it('renders Step1 for admin and navigates to Step2 on next', async () => {
    render(<Wizard role="admin" />);

    expect(screen.getByText(/Basic Information/i)).toBeInTheDocument();
    // click the mocked Next button inside Step1
    fireEvent.click(screen.getByText('Mock Next'));

    // Now Step2 should be rendered
    await waitFor(() => expect(screen.getByText('MockStep2')).toBeInTheDocument());
  });

  it('starts at Step2 for ops role', () => {
    render(<Wizard role="ops" />);
    expect(screen.getByText(/Employee Details/i)).toBeInTheDocument();
    expect(screen.getByText('MockStep2')).toBeInTheDocument();
  });

  it('calls submit and navigates on successful final submit', async () => {
    // ensure submit resolves true
    submitMock = vi.fn(async () => true);

    render(<Wizard role="admin" />);

    // move to step2 by clicking Mock Next
    fireEvent.click(screen.getByText('Mock Next'));
    await waitFor(() => expect(screen.getByText('MockStep2')).toBeInTheDocument());

    // click mocked submit
    fireEvent.click(screen.getByText('Mock Submit'));

    // submitMock should have been called
    await waitFor(() => expect(submitMock).toHaveBeenCalled());

    // navigate should be called after successful submit
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/employees?p=1'));
    // localStorage for draft should be removed
    expect(localStorage.getItem('draft-admin')).toBeNull();
  });

  it('shows SubmissionProgress when isSubmitting is true', () => {
    isSubmittingFlag = true;
    render(<Wizard role="admin" />);
    expect(screen.getByText(/Submitting\.\.\./i)).toBeInTheDocument();
  });
});
