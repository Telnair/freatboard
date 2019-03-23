export enum Note {
  A = 'A',
  Bb = 'A#/Bb',
  B = 'B',
  C = 'C',
  Db = 'C#/Db',
  D = 'D',
  Eb = 'D#/Eb',
  E = 'E',
  F = 'F',
  Gb = 'F#/Gb',
  G = 'G',
  Ab = 'G#/Ab',
}

export type IFretboard = Array<Note[]>;

export type SelectedNote = Note | null;