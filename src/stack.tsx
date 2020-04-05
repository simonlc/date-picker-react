import React from 'react';

interface StackProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}

export function Stack({ children, className, gap = 15 }: StackProps) {
  return (
    <div className={className} style={{ display: 'grid', gap }}>
      {children}
    </div>
  );
}
