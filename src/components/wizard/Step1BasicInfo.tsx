import { useState, useEffect } from 'react';
import type { BasicInfoEntity, OptionTypeEntity } from '../../core/types/employee';
import { EmployeeService } from '../../services/employee.service';
import { generateEmployeeId } from '../../core/utils/idGenerator';
import { useDebounce } from '../../hooks/useDebounce';

interface Step1Props {
  data?: Partial<BasicInfoEntity>;
  onChange: (data: Partial<BasicInfoEntity>) => void;
  onNext: (data: BasicInfoEntity) => void;
}

const Step1BasicInfo = ({ data, onChange, onNext }: Step1Props) => {
  const [form, setForm] = useState<Partial<BasicInfoEntity>>(data || {});
  const [searchTerm, setSearchTerm] = useState(data?.department || '');
  const [suggestions, setSuggestions] = useState<OptionTypeEntity[]>([]);
  const [emailError, setEmailError] = useState('');
  // const [count, setCount] = useState(0); // For ID generation

  const idleFormData = useDebounce(form, 2000);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Autocomplete Departments
  useEffect(() => {
    if (debouncedSearch.length > 2) {
      EmployeeService.getDepartments(debouncedSearch).then((res) => {
        setSuggestions(res.data);
      });
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  // debounce autosave on idle
  useEffect(() => {
    if (idleFormData) {
      onChange(idleFormData);
    }
  }, [idleFormData]);
  


  const handleSelectDept = async (dept: OptionTypeEntity) => {
    try {
      // Fetch all basicInfo records 
      const response = await EmployeeService.getAllBasicInfo(1, 1000); 
      const allEmployees = response.data;
      
      // find number of employees already in this department
      const deptCount = allEmployees.filter(
        (emp: BasicInfoEntity) => emp.department === dept.name
      ).length;

      // generate new ID
      const newId = generateEmployeeId(dept.name, deptCount);

      setSearchTerm(dept.name);
      setSuggestions([]);
      setForm({ 
        ...form, 
        department: dept.name, 
        employee_id: newId 
      });
    } catch (error) {
      console.error("Failed to calculate ID:", error);
    }
  };

  // handle submit first step (go to next)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.full_name && form.email && form.department) {
      onNext(form as BasicInfoEntity);
    }
  };

  // email validation
  const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
    setForm({ ...form, email });
  };

  const isFormInvalid = 
    !form.full_name || 
    !form.email || 
    !!emailError || 
    !form.department || 
    !form.role || 
    !form.employee_id;

  return (
    <form className="x-form" onSubmit={handleSubmit}>
      {/* Full Name and Email fields */}
      <div className="x-form__field">
        <label className="x-form__label" htmlFor="full_name">Full Name</label>
        <input 
          className="x-form__input" 
          id="full_name"
          value={form.full_name || ''} 
          onChange={e => setForm({...form, full_name: e.target.value})} 
          required 
        />
      </div>
      <div className="x-form__field">
        <label className="x-form__label" htmlFor="email">Email</label>
        <input 
          type="email"
          className="x-form__input" 
          id="email"
          value={form.email || ''} 
          onChange={e => validateEmail(e.target.value)}
          required 
        />
        {emailError && <span className="text-danger">{emailError}</span>}
      </div>
      {/* Department and Role fields */}
      <div className="x-form__field form__group">
        <label className="x-form__label " htmlFor="department">Department (Search)</label>
        <input 
          className="x-form__input" 
          value={searchTerm} 
          id="department"
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
        />
        {suggestions.length > 0 && (
          <ul className="x-form__autocomplete-list">
            {suggestions.map(d => (
              <li key={d.id} onClick={() => handleSelectDept(d)}>{d.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="x-form__field form__group">
        <label className="x-form__label" htmlFor="role">Designated Role</label>
        <select 
          className="x-form__input x-form__select"
          id="role"
          value={form.role || ''}
          onChange={(e) => setForm({ ...form, role: e.target.value as any })}
          required
        >
          <option value="" disabled>Select a role...</option>
          <option value="Admin">Admin</option>
          <option value="Engineer">Engineer</option>
          <option value="Finance">Finance</option>
          <option value="Ops">Ops</option>
        </select>
      </div>
      {/* Generated ID field */}
      <div className="x-form__field">
        <label className="x-form__label" htmlFor="employee_id">Generated ID</label>
        <input id="employee_id" className="x-form__input x-form__input--readonly" value={form.employee_id || ''} readOnly />
      </div>

      <button 
        type="submit" 
        className={`button button--primary ${isFormInvalid ? 'button--disabled' : ''}`}
        disabled={isFormInvalid}
      >
          Next: Details
      </button>
    </form>
  );
};

export default Step1BasicInfo;