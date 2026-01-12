export enum ConflictStatus {
  Unresolved = 'UNRESOLVED',
  ResolvedLeft = 'LEFT', // Usually the "bad" choice in this narrative
  ResolvedRight = 'RIGHT', // The "good" choice
  ResolvedBoth = 'BOTH' // Merging both sides
}

export interface DiffSection {
  id: string;
  chapterTitle: string;
  context: string;
  
  // Left Side (Closed Source / Problem / Infection)
  leftContent: {
    label: string;
    text: string;
    tags: string[];
  };

  // Right Side (Open Source / Solution / Hygiene)
  rightContent: {
    label: string;
    text: string;
    tags: string[];
  };
}

export interface MergeState {
  [key: string]: ConflictStatus;
}