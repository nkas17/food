import * as React from 'react';

interface TextAreaProps {
  id: string;
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
  id,
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
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className="form-control text-box"
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
