import * as React from 'react';

interface TextInputProps {
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  error?: string;
}

function TextInput({
  name,
  label,
  onChange,
  placeholder = '',
  value = '',
  error = '',
}: TextInputProps) {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass = `${wrapperClass} has-error`;
  }

  return (
    <div className={wrapperClass}>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default TextInput;
