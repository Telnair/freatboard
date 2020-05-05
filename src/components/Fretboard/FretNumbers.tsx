import React from 'react';

export const FretNumbers: React.FC<{ frets: number }> = ({ frets }) => {
  return (
    <div className="fret-numbers">
      {Array(frets).fill(null).map((_, id) => (
        <div className="fret-number" key={id}>{id + 1}</div>
      ))}
    </div>
  );
}