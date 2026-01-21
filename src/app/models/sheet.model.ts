
export interface ISkill {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
}

export interface IProficiency {
  id: string;
  name: string;
  skillId: string;
  value: number;
  description: string;
  isProficient: boolean;
}

export interface IContact {
  id: number;
  name: string;
  relationship: string;
  location: string;
}

export interface ICharacterSheet {
  name: string;
  codename?: string;
  occupation: string;
  age: number;
  joinDate: string;
  joinReason: string;
  howWillHelp: string;
  background: string;
  level: number;
  proficiencyBonus: number;
  hp: number;
  skills: {
    physicalSkill: ISkill;
    survivalSkill: ISkill;
    intelligenceSkill: ISkill;
    sabotageSkill: ISkill;
    influenceSkill: ISkill;
  };
  proficiencies: IProficiency[];
  contacts: IContact[];
}