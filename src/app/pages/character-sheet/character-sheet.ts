import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//models
import { ISkill, IProficiency, IContact, ICharacterSheet } from '../../models/sheet.model';
//constants
import { physicalSkill, survivalSkill, intelligenceSkill, sabotageSkill, influenceSkill, allSkills} from '../../constants/skills.constants';
import { physicalProficiencies, survivalProficiencies, intelligenceProficiencies, sabotageProficiencies, influenceProficiencies } from '../../constants/proficiencies.constants';

import { FilterBySkillPipe } from '../../pipes/filter-by-skill-pipe';
@Component({
  selector: 'app-character-sheet',
  imports: [CommonModule, FilterBySkillPipe],
  templateUrl: './character-sheet.html',
  styleUrl: './character-sheet.css',
})
export class CharacterSheet implements OnInit {
  constructor() {}  

  newSheet: ICharacterSheet = {
    name: '',
    codename: '',
    occupation: '',
    age: 0,
    joinDate: '',
    joinReason: '',
    howWillHelp: '',
    background: '',
    level: 1,
    proficiency_bonus: 2,
    hp: 10,
    skills: {
      physicalSkill: physicalSkill,
      survivalSkill: survivalSkill,
      intelligenceSkill: intelligenceSkill,
      sabotageSkill: sabotageSkill,
      influenceSkill: influenceSkill
    },
    proficiencies: physicalProficiencies
      .concat(survivalProficiencies)
      .concat(intelligenceProficiencies)
      .concat(sabotageProficiencies)
      .concat(influenceProficiencies)
      ,
    contacts: []
  };

  ngOnInit(): void {
    this.updateHP();

  }

  updateHP(): void {
    this.newSheet.hp = 10 + (this.newSheet.level - 1);
  }

  getSkillName(skillId: string): string {
    const skill = allSkills.find(s => s.id === skillId);
    return skill ? skill.name : 'Desconhecido';
  }


  //TODO: revisar isso agui
  toggleProficiency(proficiency: IProficiency): void {
    for (let prof of this.newSheet.proficiencies) {
      if (prof.id === proficiency.id) {
        prof.isProficient = !prof.isProficient;
        this.updateProficiencyValue(prof);
        break;
      }
    }
  }

  getSkillTotal(skillId: string): number {
    const skill = this.newSheet.skills[skillId as keyof typeof this.newSheet.skills];
    return skill ? skill.value : 0;
  }

  updateProficiencyValue(proficiency: IProficiency): void {
    for (let skill of Object.values(this.newSheet.skills)){
      if (skill.id === proficiency.skillId) {
        proficiency.value = skill.value + (proficiency.isProficient ? this.newSheet.proficiency_bonus : 0);
      }
    }
    console.log(`Proficiency ${proficiency.name} updated to value ${proficiency.value}`);
    console.log(this.newSheet.proficiencies);
  }

  addContact() {
    // Logic to add a new contact
  }

  removeContact(index: number) {
    // Logic to remove a contact by index
  }

  decreaseSkill(skill: ISkill) {
    console.log('decreseSkill called');
  }

  increaseSkill(skill: ISkill) {
    console.log('increaseSkill called');
  } 

  getInfluenceTotal(): number {
    return 3
  }
}
