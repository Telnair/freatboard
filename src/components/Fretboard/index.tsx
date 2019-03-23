import React, { useState, useMemo } from 'react';
import './styles.css';
import { Note, IFretboard, SelectedNote } from './types';

const notes: Note[] = Object.values(Note);
const majScale = [0, 1, 1, 0.5, 1, 1, 1, 0.5];
const natMinorScale = [0, 1, 0.5, 1, 1, 0.5, 1, 1];
const chromaticScale = [0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

const FretNumbers: React.FC<{ frets: number }> = ({ frets }) => {
  return (
    <div className="fret-numbers">
      {Array(frets).fill(null).map((fret, id) => (
        <div className="fret-number" key={id}>{id + 1}</div>
      ))}
    </div>
  );
}

interface String {
  rootNote: Note;
  string: Note[];
  onSetSelectedNote: (note: SelectedNote) => void;
  selectedNote: SelectedNote;
}

const String: React.FC<String> = ({ rootNote, string, onSetSelectedNote, selectedNote }) => {
  return (
    <div className="string">
      <div className="string-number">{rootNote}</div>
      <div className="frets">
        {string.map((fret, id) =>
          <div
            key={id}
            className={`fret ${selectedNote === null ? 'selected' : (selectedNote === fret ? 'selected' : '')}`}
            onClick={() => onSetSelectedNote(fret === selectedNote ? null : fret)}
          >
            {fret}
          </div>)}
      </div>
    </div>
  );
}

const defaultGuitarRoots = [ Note.E, Note.A, Note.D, Note.G, Note.B, Note.E ].reverse();

export const Fretboard: React.FC<{}> = () => {
  const [ frets, setFrets ] = useState<number>(12);
  const [ selectedNote, setSelectedNote ] = useState<SelectedNote>(null);
  const [ roots, setRoots ] = useState<Note[]>(defaultGuitarRoots);

  const getNoteByInterval = (note: Note, interval: number): Note => {
    const dir = interval < 0 ? 'desc' : 'asc';
    const noteReducer = (fn: (note: Note) => Note) => Array(Math.abs(interval * 2)).fill(null).reduce(fn, note);
    return dir === 'asc' ? noteReducer(getNextNote) : noteReducer(getPrevNote);
  };

  const getNextNote = (note: Note): Note => {
    const noteIdx = notes.indexOf(note);
    return notes[noteIdx >= notes.length - 1 ? 0 : noteIdx + 1];
  };

  const getPrevNote = (note: Note): Note => {
    const noteIdx = notes.indexOf(note);
    return notes[noteIdx === 0 ? notes.length - 1 : noteIdx - 1];
  };

  const createNoteRange = (rootNote: Note, range: number[]): Note[] => {
    let currentRoot = rootNote;
    return range.map((interval) => {
      const note = getNoteByInterval(currentRoot, interval)
      currentRoot = note;
      return note;
    });
  };

  const createFretboard = (strings: Note[], frets: number): IFretboard => {
    return strings.map(rootNote => createNoteRange(rootNote, Array(frets).fill(0.5)));
  };

  const fretboard = createFretboard(roots, frets);

  return (
    <div className="fretboard">
      <FretNumbers frets={frets} />
      {roots.map((root, id) =>
        <String
          key={id}
          selectedNote={selectedNote}
          rootNote={root}
          string={fretboard[id]}
          onSetSelectedNote={setSelectedNote}
        />)}
    </div>
  );
}