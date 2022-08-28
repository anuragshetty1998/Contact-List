export interface Contact {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  select?: boolean;
}

export interface Group {
  id: string;
  name: string;
  members: string[];
}
