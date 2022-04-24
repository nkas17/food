import * as React from 'react';

interface TextAreaProps {
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean;
  rows?: number;
  cols?: number;
  placeholder?: string;
  value?: string;
  error?: string;
}

function TextArea({
  name,
  label,
  onChange,
  readonly,
  rows = 0,
  cols = 0,
  placeholder = '',
  value = '',
  error = '',
}: TextAreaProps) {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass = `${wrapperClass} has-error`;
  }

  return (
    <div className={wrapperClass}>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <textarea
        name={name}
        className="form-control"
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        readOnly={readonly}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default TextArea;
