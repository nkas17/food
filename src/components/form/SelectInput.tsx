import * as React from 'react';

interface SelectInputProps {
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultOption?: string;
  value?: string;
  error?: string;
  options: { value: string | number; text: string }[];
}

function SelectInput({
  name,
  label,
  onChange,
  defaultOption = '...Select',
  value = '',
  error = '',
  options = [],
}: SelectInputProps) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <select name={name} value={value} onChange={onChange} className="form-control">
        <option value="">{defaultOption}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default SelectInput;
