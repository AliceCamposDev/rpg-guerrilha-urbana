import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Skill {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
}

interface Proficiency {
  id: string;
  name: string;
  skillId: string;
  value: number;
  description: string;
  isProficient: boolean;
}

interface Contact {
  id: number;
  name: string;
  relationship: string;
  location: string;
}

@Component({
  selector: 'app-character-sheet-view',
  imports: [FormsModule, CommonModule],
  templateUrl: './character-sheet-view.html',
  styleUrl: './character-sheet-view.css',
})

export class CharacterSheetView implements OnInit {
  // Dados básicos
  characterName: string = 'Marilene Villas-Boas';
  codename: string = 'Índia';
  characterJob: string = 'Estudante de Psicologia';
  characterAge: number = 22;
  characterContribution: string = 'Com sua formação em psicologia, pode atuar na análise de comportamentos e recrutamento, além de sua coragem em combate.';
  joinDate: string = '1969-01-01';
  joinReason: string = 'Perseguida pelo regime militar devido à sua militância estudantil, decidiu entrar na clandestinidade e lutar contra a ditadura.';
  characterBackground: string = 'Marilena Villas Boas Pinto, nascida em 8 de julho de 1948 no Rio de Janeiro, era descendente da aristocracia brasileira (Barão de Nova Friburgo) mas escolheu o caminho da revolução. Filha do renomado neurocirurgião Feliciano Pinto e de Avelina Villas-Boas Pinto, tinha tudo para seguir uma vida confortável, mas sua consciência política a levou para outro destino. Como estudante de Psicologia na Universidade Santa Úrsula, envolveu-se com o movimento estudantil contra a ditadura militar instalada em 1964. A perseguição do regime a levou para a clandestinidade em 1969, quando ingressou na Aliança Libertadora Nacional (ALN), organização de esquerda que pregava a luta armada contra o governo militar. Posteriormente, migrou para o Movimento Revolucionário 8 de Outubro (MR-8), onde atuou ao lado de seu companheiro Mário Prata. Durante seu período na clandestinidade, recebeu o codinome Índia e participou de várias operações de inteligência, recrutamento e ações armadas contra o regime.';

  // Status
  level: number = 1;
  proficiency: number = 2;
  hp: number = 10;

  // Categorias de habilidades
  physicalSkill: Skill= { id: 'physicalSkill', name: 'Físico e Combate', value: 0, min: -2, max: 4};
  survivalSkill: Skill= { id: 'survivalSkill', name: 'Sobrevivência e Medicina', value: 0, min: -2, max: 4};
  intelligenceSkill: Skill= { id: 'intelligenceSkill', name: 'Inteligência e Estratégia', value: 0, min: -2, max: 4};
  sabotageSkill: Skill= { id: 'sabotageSkill', name: 'Sabotagem e Construção', value: 0, min: -2, max: 4};
  influenceSkill: Skill= { id: 'influenceSkill', name: 'Influência e Psicologia', value: 0, min: -2, max: 4};

  // Perícias

  getSkillName(skillId: string): string {
    const allSkills = [this.physicalSkill, this.survivalSkill, this.intelligenceSkill, this.sabotageSkill, this.influenceSkill];
    const skill = allSkills.find(s => s.id === skillId);
    return skill ? skill.name : 'Desconhecido';
  }
  // Contatos
  contacts: Contact[] = [
    { id: 1, name: 'Mário Prata', relationship: 'Companheiro de organização', location: 'São Paulo' },
    { id: 2, name: 'Carlos Lamarca', relationship: 'Líder da VPR', location: 'Vale do Ribeira' }
  ];

  nextContactId: number = 3;

  constructor() { }

  ngOnInit(): void {
    // Atualiza HP inicial
    this.updateHP();
    
    // Atualiza valores das perícias
    this.updateAllProficiencies();
  }

  // Métodos para status
  updateHP(): void {
    this.hp = 10 + (this.level - 1);
  }

  increaseLevel(): void {
    if (this.level < 20) {
      this.level++;
      this.updateHP();
      this.updateProficiencyBonus();
      this.updateAllProficiencies();
    }
  }

  updateProficiencyBonus(): void {
    this.proficiency = Math.min(Math.max(Math.floor((this.level + 1) / 4) + 2, 2), 6);
    this.updateAllProficiencies();
  }

  decreaseLevel(): void {
    if (this.level > 1) {
      this.level--;
      this.updateHP();
      this.updateProficiencyBonus();
      this.updateAllProficiencies();
    }
  }

  increaseProficiency(): void {
    if (this.proficiency < 6) {
      this.proficiency++;
      this.updateAllProficiencies();
    }
  }

  decreaseProficiency(): void {
    if (this.proficiency > 2) {
      this.proficiency--;
      this.updateAllProficiencies();
    }
  }

  // Métodos para habilidades
  increaseSkill(skill: Skill): void {
    if (skill.value < skill.max) {
      skill.value++;
      this.updateProficienciesBySkill(skill.id);
    }
  }

  decreaseSkill(skill: Skill): void {
    if (skill.value > skill.min) {
      skill.value--;
      this.updateProficienciesBySkill(skill.id);
    }
  }

  // Métodos para perícias
  updateAllProficiencies(): void {
    // Atualiza todas as perícias baseadas nas habilidades
    this.updateProficiencies(this.physicalProficiencies);
    this.updateProficiencies(this.survivalProficiencies);
    this.updateProficiencies(this.intelligenceProficiencies);
    this.updateProficiencies(this.sabotageProficiencies);
    this.updateProficiencies(this.influenceProficiencies);
  }

  updateProficiencies(proficiencies: Proficiency[]): void {
    proficiencies.forEach(proficiency => {
      this.updateProficiencyValue(proficiency);
    });
  }

  updateProficienciesBySkill(skillId: string): void {
    // Encontra e atualiza todas as perícias que usam esta habilidade
    const allProficiencies = [
      ...this.physicalProficiencies,
      ...this.survivalProficiencies,
      ...this.intelligenceProficiencies,
      ...this.sabotageProficiencies,
      ...this.influenceProficiencies
    ];
    
    allProficiencies.forEach(proficiency => {
      if (proficiency.skillId === skillId) {
        this.updateProficiencyValue(proficiency);
      }
    });
  }

  updateProficiencyValue(proficiency: Proficiency): void {
    // Encontra a habilidade relacionada
    const allSkills = [this.physicalSkill, this.survivalSkill, this.intelligenceSkill, this.sabotageSkill, this.influenceSkill];
    
    const relatedSkill = allSkills.find(skill => skill.id === proficiency.skillId);
    
    if (relatedSkill) {
      // Calcula o valor da perícia: habilidade relacionada + (proficiência se marcada)
      proficiency.value = relatedSkill.value + (proficiency.isProficient ? this.proficiency : 0);
    }
  }

  toggleProficiency(proficiency: Proficiency): void {
    proficiency.isProficient = !proficiency.isProficient;
    this.updateProficiencyValue(proficiency);
  }

  // Métodos para contatos
  addContact(): void {
    this.contacts.push({
      id: this.nextContactId++,
      name: 'Novo Contato',
      relationship: 'Relação',
      location: 'Localização'
    });
  }

  removeContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
  }

  // Métodos auxiliares para cálculos
  getSkillTotal(skills: Skill[]): number {
    return skills.reduce((total, skill) => total + skill.value, 0);
  }

  getPhysicalTotal(): number {
    return this.physicalSkill.value;
  }

  getSurvivalTotal(): number {
    return this.survivalSkill.value;
  }

  getIntelligenceTotal(): number {
    return this.intelligenceSkill.value;
  }

  getSabotageTotal(): number {
    return this.sabotageSkill.value;  
  }

  getInfluenceTotal(): number {
    return this.influenceSkill.value;
  }

  printSheet() {
    window.print();
  }


  // Método para exportar dados da ficha (útil para salvar)
  exportCharacterData(): any {
    return {
      characterName: this.characterName,
      codename: this.codename,
      characterJob: this.characterJob,
      characterAge: this.characterAge,
      joinDate: this.joinDate,
      level: this.level,
      proficiency: this.proficiency,
      hp: this.hp,
      skills: {
        physical: this.physicalSkill,
        survival: this.survivalSkill,
        intelligence: this.intelligenceSkill,
        sabotage: this.sabotageSkill,
        influence: this.influenceSkill
      },
      proficiencies: {
        physical: this.physicalProficiencies,
        survival: this.survivalProficiencies,
        intelligence: this.intelligenceProficiencies,
        sabotage: this.sabotageProficiencies,
        influence: this.influenceProficiencies
      },
      contacts: this.contacts
    };
  }
}
