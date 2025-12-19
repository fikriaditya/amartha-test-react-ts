import { useState, useEffect } from 'react';
import type { EmployeeDetailsEntity } from '../../core/types/employee';
import { EmployeeService } from '../../services/employee.service';
import { convertToBase64 } from '../../core/utils/fileConverter';
import { useDebounce } from '../../hooks/useDebounce';

interface Step2Props {
  data?: Partial<EmployeeDetailsEntity>;
  showBackButton: boolean;
  employee_id: string;
  onChange: (data: Partial<EmployeeDetailsEntity>) => void;
  onBack: () => void;
  onSubmit: (data: EmployeeDetailsEntity) => void;
}

const Step2Details = ({ data, showBackButton, employee_id, onChange, onBack, onSubmit }: Step2Props) => {
  const [form, setForm] = useState<Partial<EmployeeDetailsEntity>>(data || {});
  const [locationSearch, setLocationSearch] = useState(data?.location || '');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  
  const idleFormData = useDebounce(form, 2000);
  const debouncedLocation = useDebounce(locationSearch, 500);

  // autocomplete Location field
  useEffect(() => {
    if (debouncedLocation.length > 2) {
      EmployeeService.getLocations(debouncedLocation).then(res => setSuggestions(res.data));
    }
  }, [debouncedLocation]);

  // debounce autosave on idle
  useEffect(() => {
    if (idleFormData) {
      onChange(idleFormData);
    }
  }, [idleFormData]);

  // Handle Photo Upload, convert to base64
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertToBase64(e.target.files[0]);
      setForm({ ...form, photo_url: base64 });
    }
  };

  if(showBackButton && employee_id && !form.employee_id) {
    setForm({ ...form, employee_id: employee_id });
    console.log('Set employee_id in form:', employee_id);
  }

  return (
    <div className="x-form">
      {/* file upload */}
      <div className="x-form__field">
        <label className="x-form__label">Employee Photo</label>
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="x-form__file-input" />
        {form.photo_url && <img src={form.photo_url} alt="Preview" className="x-form__photo-preview" />}
      </div>
      {/* Employment Type and Location fields */}
      <div className="x-form__field">
        <label className="x-form__label">Employment Type</label>
        <select 
          className="x-form__input x-form__select"
          value={form.employment_type || ''}
          onChange={(e) => setForm({ ...form, employment_type: e.target.value as any })}
          required
        >
          <option value="" disabled>Select a role...</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Intern">Intern</option>
        </select>
      </div>
      <div className="x-form__field">
        <label className="x-form__label">Work Location</label>
        <input 
          className="x-form__input" 
          value={locationSearch} 
          onChange={(e) => setLocationSearch(e.target.value)}
          placeholder="Search locations..."
        />
        {suggestions.length > 0 && (
          <ul className="form__autocomplete-list">
            {suggestions.map(loc => (
              <li key={loc.id} onClick={() => {
                setForm({...form, location: loc.name});
                setLocationSearch(loc.name);
                setSuggestions([]);
              }}>{loc.name}</li>
            ))}
          </ul>
        )}
      </div>
      {/* Notes */}
      <div className="x-form__field">
        <label className="x-form__label" htmlFor="user_message">Additional Notes</label>
        <textarea 
          id="user_message"
          className="x-form__input"
          value={form.notes || ''}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          name="message" 
          rows={4} 
          cols={50}
          placeholder="Enter any additional employment details or special instructions..."
        />
      </div>
      {/* Action Buttons */}
      <div className="x-form__actions button-group">
        {showBackButton && (
          <button type="button" onClick={onBack} className="button button--secondary">Back</button>
        )}
        <button 
          type="button" 
          onClick={() => onSubmit(form as EmployeeDetailsEntity)} 
          className="button button--primary"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
};

export default Step2Details;