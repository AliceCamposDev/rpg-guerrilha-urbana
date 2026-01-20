
export interface Skill {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
}

export interface Proficiency {
  id: string;
  name: string;
  skillId: string;
  value: number;
  description: string;
  isProficient: boolean;
}

export interface Contact {
  id: number;
  name: string;
  relationship: string;
  location: string;
}

