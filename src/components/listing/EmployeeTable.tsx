import { useLocation, useNavigate } from 'react-router-dom';
import type { EmployeeListEntity } from '../../core/types/employee';

interface EmployeeTableProps {
  data: EmployeeListEntity[];
  role: 'ops' | 'admin';
}

const EmployeeTable = ({ data }: EmployeeTableProps) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  // navigate to wizard
  const onAddEmployee = () => {
    const baseUrl = '/wizard';
    navigate(`${baseUrl}${search}`);
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <div>
          <h2>Employee Directory</h2>
          <p>Real-time view of registered team members</p>
        </div>
        <div className="table-actions">
          <button 
            className="button button--primary" 
            onClick={() => onAddEmployee()}>
            <span className="button__icon plus-icon"></span>
            Add New Employee
          </button>
        </div>
      </div>
      
      <table className="x-table">
        <thead>
          <tr>
            <th className="sortable">Name <span className="sort-icon">↕</span></th>
            <th className="sortable">Department <span className="sort-icon">↕</span></th>
            <th className="sortable">Role <span className="sort-icon">↕</span></th>
            <th className="sortable">Location <span className="sort-icon">↕</span></th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((emp) => (
              <tr key={emp.employee_id}>
                <td><strong>{emp.full_name || '-'}</strong></td>
                <td>{emp.department || '-'}</td>
                <td>{emp.role || '-'}</td>
                <td>{emp.location || 'N/A'}</td>
                <td>
                  {emp.photo_url ? (
                    <img 
                      src={emp.photo_url} 
                      alt={emp.full_name} 
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <span className="text-muted">No Photo</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;