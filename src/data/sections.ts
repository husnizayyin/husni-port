/** Order matters: it drives the progress meter, the dot rail and the nav highlight. */
export const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'position', label: 'Specialization' },
  { id: 'film', label: 'Journey' },
  { id: 'work', label: 'Experience' },
  { id: 'depth', label: 'Philosophy' },
  { id: 'mix', label: 'Tech Matrix' },
  { id: 'contact', label: 'Contact' },
] as const;

export const NAV = [
  { id: 'position', label: 'Specialization' },
  { id: 'film', label: 'Journey' },
  { id: 'work', label: 'Experience' },
  { id: 'mix', label: 'Tech Matrix' },
  { id: 'contact', label: 'Contact' },
] as const;
