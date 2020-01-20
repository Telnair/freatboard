import { Note, Scale } from './types';

export const notes: Note[] = Object.values(Note);
export const scales: Record<Scale, number[]> = {
  chromatic: [0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  natMinor: [0, 1, 0.5, 1, 1, 0.5, 1, 1],
  major: [0, 1, 1, 0.5, 1, 1, 1, 0.5],
  penta: [0, 1, 1, 1.5, 1, 1.5],
}
export const defaultGuitarRoots = [ Note.E, Note.A, Note.D, Note.G, Note.B, Note.E ].reverse();