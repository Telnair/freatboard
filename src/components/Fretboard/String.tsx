import React from 'react';
import { Note, SelectedNote, Scale } from './types';

interface String {
  stringRoot: Note;
  string: Note[];
  onSetSelectedNote: (note: SelectedNote) => void;
  selectedNote: SelectedNote;
  selectedScale: Scale;
  scaleRoot: Note;
  selectedScaleNotes: Note[];
}

export const String: React.FC<String> = ({ stringRoot, string, onSetSelectedNote, selectedNote, selectedScale, scaleRoot, selectedScaleNotes }) => {
  return (
    <div className="string">
      <div className="string-number">{stringRoot}</div>
      <div className="frets">
        {string.map((fret, id) =>
          <div
            key={id}
            className={`fret ${selectedNote === null
              ? (selectedScaleNotes.indexOf(fret) !== -1 ? 'selected' : '')
              : (selectedNote === fret ? 'selected' : '')} ${selectedScale !== 'chromatic'
              ? (fret === scaleRoot ? 'root' : '')
              : ''}`}
            onClick={() => onSetSelectedNote(fret === selectedNote ? null : fret)}
          >
            {fret}
          </div>)}
      </div>
    </div>
  );
}