import React from 'react';

export function DatePicker() {
  return (
    <div>
      {Array(31)
        .fill(0)
        .map((_, index) => (
          <button>
            <time>{index}</time>
          </button>
        ))}
    </div>
  );
}
