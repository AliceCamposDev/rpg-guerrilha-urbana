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
  physicalProficiencies: Proficiency[] = [
    { id: 'melee fight', name: 'Luta Corporal', skillId: 'physicalSkill', value: 0, description: 'Briga de faca, porrete, técnicas improvisadas', isProficient: false },
    { id: 'simpleFirearms', name: 'Armas de Fogo simples', skillId: 'physicalSkill', value: 0, description: 'Pistolas, submetralhadoras, revolveres', isProficient: false },
    { id: 'heavy weapons', name: 'Armamento Pesado', skillId: 'physicalSkill', value: 0, description: 'Metralhadoras, rifles de precisão, fuzis', isProficient: false },
    { id: 'throwing', name: 'Arremesso', skillId: 'physicalSkill', value: 0, description: 'Pedras, coquetéis molotov, granadas', isProficient: false },
    { id: 'evasive driving', name: 'Dirigir Evasivo', skillId: 'physicalSkill', value: 0, description: 'Carros, motos, fugas em alta velocidade', isProficient: false },
    { id: 'stealth movement', name: 'Furtividade em Movimento', skillId:'physicalSkill' , value : 0 , description : "Escalar muros , correr silenciosamente" , isProficient : false },
    { id: 'physical endurance', name: 'Resistência Física', skillId:'physicalSkill' , value : 0 , description : "Correr longas distâncias , carregar peso" , isProficient : false }
  ];

  survivalProficiencies: Proficiency[] = [
    { id: 'first aid', name: 'Primeiros Socorros', skillId: 'survivalSkill', value: 0, description: 'Estancar sangramento, imobilizar fraturas', isProficient: false },
    { id: 'medicine', name: 'Medicina', skillId: 'survivalSkill', value: 0, description: 'Chás, remédios, tratar infecções', isProficient: false },
    { id: 'hunting gathering', name: 'Caça e Coleta', skillId: 'survivalSkill', value: 0, description: 'Encontrar comida em ambientes urbanos/rurais', isProficient: false },
    { id: 'concealment', name: 'Ocultação', skillId: 'survivalSkill', value: 0, description: 'Esconderijos, abrigos improvisados', isProficient: false },
    { id: 'urban geography', name: 'Geografia Urbana', skillId: 'survivalSkill', value: 0, description: 'Navegar por becos, favelas, rotas alternativas', isProficient: false },
    { id: 'climatology', name: 'Climatologia', skillId: 'survivalSkill', value: 0, description: 'Prever tempestades, usar o tempo a favor', isProficient: false }
  ];

  intelligenceProficiencies: Proficiency[] = [
    { id: 'reconnaissance', name: 'Reconhecimento', skillId: 'intelligenceSkill', value: 0, description: 'Identificar alvos, pontos fracos, rotas de patrulha', isProficient: false },
    { id: 'counterintelligence', name: 'Contra-inteligência', skillId: 'intelligenceSkill', value: 0, description: 'Detectar infiltrados, armadilhas', isProficient: false },
    { id: 'cryptography', name: 'Criptografia', skillId: 'intelligenceSkill', value: 0, description: 'Códigos, mensagens secretas', isProficient: false },
    { id: 'surveillance', name: 'Vigilância', skillId: 'intelligenceSkill', value: 0, description: 'Observar sem ser visto, usar binóculos', isProficient: false },
    { id: 'topography', name: 'Topografia', skillId: 'intelligenceSkill', value: 0, description: 'Ler mapas, bússola, orientação', isProficient: false },
    { id: 'visual memory', name: 'Memória Visual', skillId:'intelligenceSkill' , value : 0 , description : "Lembrar detalhes de locais e rostos" , isProficient : false },
    { id: 'logistics', name: 'Logística', skillId: 'intelligenceSkill', value: 0, description: 'Planejar estoque de recursos, transporte', isProficient: false }
  ];

  sabotageProficiencies: Proficiency[] = [
    { id: 'demolitions', name: 'Demolições', skillId: 'sabotageSkill', value: 0, description: 'Explosivos, sabotagem de estruturas', isProficient: false },
    { id: 'lockpicking', name: 'Arrombamento', skillId: 'sabotageSkill', value: 0, description: 'Fechaduras, cofres, portas trancadas', isProficient: false },
    { id: 'electronics', name: 'Eletrônica', skillId: 'sabotageSkill', value: 0, description: 'Desarmar alarmes, circuitos simples', isProficient: false },
    { id: 'mechanics', name: 'Mecânica', skillId: 'sabotageSkill', value: 0, description: 'Veículos, máquinas simples', isProficient: false },
    { id: 'improvised devices', name: 'Dispositivos Improvisados', skillId: 'sabotageSkill', value: 0, description: 'Bombas caseiras, armadilhas', isProficient: false }
  ];

  influenceProficiencies: Proficiency[] = [
    { id: 'persuasion', name: 'Persuasão', skillId: 'influenceSkill', value: 0, description: 'Convencer, negociar, influenciar', isProficient: false },
    { id: 'intimidation', name: 'Intimidação', skillId: 'influenceSkill', value: 0, description: 'Ameaças, presença imponente', isProficient: false },
    { id: 'deception', name: 'Enganação', skillId: 'influenceSkill', value: 0, description: 'Mentiras, disfarces, falsas identidades', isProficient: false },
    { id: 'leadership', name: 'Liderança', skillId: 'influenceSkill', value: 0, description: 'Motivar, comandar grupos', isProficient: false },
    { id: 'psychology', name: 'Psicologia', skillId: 'influenceSkill', value: 0, description: 'Analisar comportamentos, manipulação emocional', isProficient: false }
  ];

  getSkillName(skillId: string): string {
    const allSkills = [this.physicalSkill, this.survivalSkill, this.intelligenceSkill, this.sabotageSkill, this.influenceSkill];
    const skill = allSkills.find(s => s.id === skillId);
    return skill ? skill.name : 'Desconhecido';
  }
  // Contatos
  contacts: Contact[] = [
    { id: 1, name: 'Mário Prata', relationship: 'Companheiro de organização', location: 'São Paulo' },
    { id: 2, name: 'Carlos Lamarca', relationship: 'Líder da ALN', location: 'Vale do Ribeira' }
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
    this.proficiency = Math.floor((this.level + 1) / 4) + 2;
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
