import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill, Proficiency, Contact } from '../../models/sheet.model';
import { physicalSkill, survivalSkill, intelligenceSkill, sabotageSkill, influenceSkill } from '../../constants/skills.constants';

@Component({
  selector: 'app-character-sheet',
  imports: [CommonModule],
  templateUrl: './character-sheet.html',
  styleUrl: './character-sheet.css',
})
export class CharacterSheet {
  constructor() {}

  getSkillName(skillId: string): string {
    const allSkills = [physicalSkill, survivalSkill, this.intelligenceSkill, this.sabotageSkill, this.influenceSkill];
    const skill = allSkills.find(s => s.id === skillId);
    return skill ? skill.name : 'Desconhecido';
  }

  addContact() {
    // Logic to add a new contact
  }

  removeContact(index: number) {
    // Logic to remove a contact by index
  }



}
