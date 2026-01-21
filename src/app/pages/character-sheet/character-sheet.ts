import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//models
import { ISkill, IProficiency, IContact, ICharacterSheet } from '../../models/sheet.model';
//constants
import { physicalSkill, survivalSkill, intelligenceSkill, sabotageSkill, influenceSkill, allSkills} from '../../constants/skills.constants';
import { physicalProficiencies, survivalProficiencies, intelligenceProficiencies, sabotageProficiencies, influenceProficiencies } from '../../constants/proficiencies.constants';
//pipes
import { FilterBySkillPipe } from '../../pipes/filter-by-skill-pipe';
@Component({
  selector: 'app-character-sheet',
  imports: [CommonModule, FormsModule, FilterBySkillPipe],
  templateUrl: './character-sheet.html',
  styleUrl: './character-sheet.css',
})
export class CharacterSheet implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}  

  newSheet: ICharacterSheet = {
    name: '',
    codename: '',
    occupation: '',
    age: 22,
    joinDate: '1970-05-11',
    joinReason: '',
    howWillHelp: '',
    background: '',
    level: 1,
    proficiencyBonus: 2,
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
        proficiency.value = skill.value + (proficiency.isProficient ? this.newSheet.proficiencyBonus : 0);
      }
    }
  }

  decreaseSkill(skill: ISkill) {
    for (let key in this.newSheet.skills) {
      if (this.newSheet.skills[key as keyof typeof this.newSheet.skills].id === skill.id) {
        let skillToDecrease = this.newSheet.skills[key as keyof typeof this.newSheet.skills];
        if (skillToDecrease.value > skillToDecrease.min) {
          skillToDecrease.value -= 1;
          this.updateAllProficiencies();
        }
        break;
      }
    }
  }

  increaseSkill(skill: ISkill) {
    for (let key in this.newSheet.skills) {
      if (this.newSheet.skills[key as keyof typeof this.newSheet.skills].id === skill.id) {
        let skillToIncrease = this.newSheet.skills[key as keyof typeof this.newSheet.skills];
        if (skillToIncrease.value < skillToIncrease.max) {
          skillToIncrease.value += 1;
          this.updateAllProficiencies();
        }
        break;
      }
    }
  } 

  updateAllProficiencies(){
    for (let proficiency of this.newSheet.proficiencies) {
      this.updateProficiencyValue(proficiency);
    }
  }

  increaseLevel() {
    if (this.newSheet.level < 20) {
      this.newSheet.level += 1; 
      this.updateHP();
      this.updateAllProficiencyBonus();
    }
  }

  decreaseLevel() {
    if (this.newSheet.level > 1) {
      this.newSheet.level -= 1;
      this.updateHP();
      this.updateAllProficiencyBonus();
    }
  }

  updateAllProficiencyBonus(){
    this.newSheet.proficiencyBonus = Math.floor((this.newSheet.level + 1) / 4) + 2;
    this.updateAllProficiencies();
  }

  addContact() {
    const newContact: IContact = {
      id: this.newSheet.contacts.length + 1,
      name: '',
      relationship: '',
      location: ''
    };
    this.newSheet.contacts.push(newContact);
  }

  removeContact(index: number) {
    this.newSheet.contacts = this.newSheet.contacts.filter(contact => contact.id !== index);
    // Reassign IDs.. not the best, but works
    this.newSheet.contacts.forEach((contact, idx) => {
      contact.id = idx + 1;
    });
  }

  exportSheet() {
    const sheetData = JSON.stringify(this.newSheet, null, 2);
    const blob = new Blob([sheetData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.newSheet.name || 'character_sheet'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importSheet() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const importedSheet: ICharacterSheet = JSON.parse(e.target.result);
          this.newSheet = importedSheet;
          this.cdr.detectChanges();
        } catch (error) {
          console.error('Erro ao importar a ficha:', error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  printSheet() {
    window.alert('impressão ta paia por enquanto');
    window.print();
  }
}