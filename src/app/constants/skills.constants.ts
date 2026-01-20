import { ISkill } from '../models/sheet.model';

export const physicalSkill: ISkill = {
  id: 'physicalSkill',
  name: 'Físico e Combate',
  value: 0,
  min: -2,
  max: 4,
};

export const survivalSkill: ISkill = {
  id: 'survivalSkill',
  name: 'Sobrevivência e Medicina',
  value: 0,
  min: -2,
  max: 4,
};

export const intelligenceSkill: ISkill = {
  id: 'intelligenceSkill',
  name: 'Inteligência e Estratégia',
  value: 0,
  min: -2,
  max: 4,
};

export const sabotageSkill: ISkill = {
  id: 'sabotageSkill',
  name: 'Sabotagem e Construção',
  value: 0,
  min: -2,
  max: 4,
};

export const influenceSkill: ISkill = {
  id: 'influenceSkill',
  name: 'Influência e Psicologia',
  value: 0,
  min: -2,
  max: 4,
};

export const allSkills: ISkill[] = [
  physicalSkill,
  survivalSkill,
  intelligenceSkill,
  sabotageSkill,
  influenceSkill,
];
