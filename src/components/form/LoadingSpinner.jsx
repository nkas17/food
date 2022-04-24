import * as React from 'react';

function LoadingSpinner() {
  return (
    <div style={{ margin: '0 auto', width: '100px', padding: '36px' }}>
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}

export default LoadingSpinner;
