export interface Contact {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  select?: boolean;
  name?: string;
  image?: string;
  date?: number;
}

export interface Group {
  id: string;
  name: string;
  members: string[];
  image?: string;
  date?: number;
  select?: boolean;
}
