import React, { useState } from 'react';
import './styles.css';
import { Note, IFretboard, SelectedNote, Scale } from './types';
import { String } from './String';
import { FretNumbers } from './FretNumbers';
import { notes, defaultGuitarRoots, scales } from './consts';
import { Settings } from './Settings';



export const Fretboard: React.FC<{}> = () => {
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

  const [ scaleRoot, setScaleRoot ] = useState<Note>(Note.A);
  const [ frets, setFrets ] = useState<number>(12);
  const [ selectedNote, setSelectedNote ] = useState<SelectedNote>(null);
  const [ selectedScale, setSelectedScale ] = useState<Scale>('pentatonicMinor');
  const [ roots, setRoots ] = useState<Note[]>(defaultGuitarRoots);
  const [ isLeftHanded, setIsLeftHanded ] = useState<boolean>(false);

  const handleSetLeftHanded = () => setIsLeftHanded(prev => !prev);

  const fretboard = createFretboard(roots, frets);

  return (
    <>
      <div className={`fretboard ${isLeftHanded ? 'left-handed' : ''}`}>
        <FretNumbers frets={frets} />
        {roots.map((root, id) =>
          <String
            stringRoot={root}
            selectedScale={selectedScale}
            selectedScaleNotes={createNoteRange(scaleRoot, scales[selectedScale])}
            scaleRoot={scaleRoot}
            key={id}
            selectedNote={selectedNote}
            string={fretboard[id]}
            onSetSelectedNote={setSelectedNote}
          />)}
      </div>
      <Settings
        scaleRoot={scaleRoot}
        onSetScaleRoot={setScaleRoot}
        frets={frets}
        onSetFrets={setFrets}
        onSetSelectedScale={setSelectedScale}
        selectedScale={selectedScale}
        isLeftHanded={isLeftHanded}
        onSetIsLeftHanded={handleSetLeftHanded}
        roots={roots}
        onSetRoots={setRoots}
      />
    </>
  );
}