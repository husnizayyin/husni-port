/** Order matters: it drives the progress meter, the dot rail and the nav highlight. */
export const SECTIONS = [
  { id: 'hero', label: 'Title' },
  { id: 'position', label: 'Position' },
  { id: 'film', label: 'The film' },
  { id: 'work', label: 'Work' },
  { id: 'depth', label: 'Belief' },
  { id: 'mix', label: 'Channel mix' },
  { id: 'contact', label: 'Contact' },
] as const;

export const NAV = [
  { id: 'film', label: 'Film' },
  { id: 'work', label: 'Work' },
  { id: 'mix', label: 'Mix' },
  { id: 'contact', label: 'Contact' },
] as const;
