import { IProficiency } from '../models/sheet.model';

export const physicalProficiencies: IProficiency[] = [
{ id: 'melee fight', name: 'Luta Corporal', skillId: 'physicalSkill', value: 0, description: 'Briga de faca, porrete, técnicas improvisadas', isProficient: false },
{ id: 'simpleFirearms', name: 'Armas de Fogo simples', skillId: 'physicalSkill', value: 0, description: 'Pistolas, submetralhadoras, revolveres', isProficient: false },
{ id: 'heavy weapons', name: 'Armamento Pesado', skillId: 'physicalSkill', value: 0, description: 'Metralhadoras, rifles de precisão, fuzis', isProficient: false },
{ id: 'throwing', name: 'Arremesso', skillId: 'physicalSkill', value: 0, description: 'Pedras, coquetéis molotov, granadas', isProficient: false },
{ id: 'evasive driving', name: 'Dirigir Evasivo', skillId: 'physicalSkill', value: 0, description: 'Carros, motos, fugas em alta velocidade', isProficient: false },
{ id: 'stealth movement', name: 'Furtividade em Movimento', skillId:'physicalSkill' , value : 0 , description : "Escalar muros , correr silenciosamente" , isProficient : false },
{ id: 'physical endurance', name: 'Resistência Física', skillId:'physicalSkill' , value : 0 , description : "Correr longas distâncias , carregar peso" , isProficient : false }
];

export const survivalProficiencies: IProficiency[] = [
{ id: 'first aid', name: 'Primeiros Socorros', skillId: 'survivalSkill', value: 0, description: 'Estancar sangramento, imobilizar fraturas', isProficient: false },
{ id: 'medicine', name: 'Medicina', skillId: 'survivalSkill', value: 0, description: 'Chás, remédios, tratar infecções', isProficient: false },
{ id: 'hunting gathering', name: 'Caça e Coleta', skillId: 'survivalSkill', value: 0, description: 'Encontrar comida em ambientes urbanos/rurais', isProficient: false },
{ id: 'concealment', name: 'Ocultação', skillId: 'survivalSkill', value: 0, description: 'Esconderijos, abrigos improvisados', isProficient: false },
{ id: 'urban geography', name: 'Geografia Urbana', skillId: 'survivalSkill', value: 0, description: 'Navegar por becos, favelas, rotas alternativas', isProficient: false },
{ id: 'climatology', name: 'Climatologia', skillId: 'survivalSkill', value: 0, description: 'Prever tempestades, usar o tempo a favor', isProficient: false }
];

export const intelligenceProficiencies: IProficiency[] = [
{ id: 'reconnaissance', name: 'Reconhecimento', skillId: 'intelligenceSkill', value: 0, description: 'Identificar alvos, pontos fracos, rotas de patrulha', isProficient: false },
{ id: 'counterintelligence', name: 'Contra-inteligência', skillId: 'intelligenceSkill', value: 0, description: 'Detectar infiltrados, armadilhas', isProficient: false },
{ id: 'cryptography', name: 'Criptografia', skillId: 'intelligenceSkill', value: 0, description: 'Códigos, mensagens secretas', isProficient: false },
{ id: 'surveillance', name: 'Vigilância', skillId: 'intelligenceSkill', value: 0, description: 'Observar sem ser visto, usar binóculos', isProficient: false },
{ id: 'topography', name: 'Topografia', skillId: 'intelligenceSkill', value: 0, description: 'Ler mapas, bússola, orientação', isProficient: false },
{ id: 'visual memory', name: 'Memória Visual', skillId:'intelligenceSkill' , value : 0 , description : "Lembrar detalhes de locais e rostos" , isProficient : false },
{ id: 'logistics', name: 'Logística', skillId: 'intelligenceSkill', value: 0, description: 'Planejar estoque de recursos, transporte', isProficient: false }
];

export const sabotageProficiencies: IProficiency[] = [
{ id: 'demolitions', name: 'Demolições', skillId: 'sabotageSkill', value: 0, description: 'Explosivos, sabotagem de estruturas', isProficient: false },
{ id: 'lockpicking', name: 'Arrombamento', skillId: 'sabotageSkill', value: 0, description: 'Fechaduras, cofres, portas trancadas', isProficient: false },
{ id: 'electronics', name: 'Eletrônica', skillId: 'sabotageSkill', value: 0, description: 'Desarmar alarmes, circuitos simples', isProficient: false },
{ id: 'mechanics', name: 'Mecânica', skillId: 'sabotageSkill', value: 0, description: 'Veículos, máquinas simples', isProficient: false },
{ id: 'improvised devices', name: 'Dispositivos Improvisados', skillId: 'sabotageSkill', value: 0, description: 'Bombas caseiras, armadilhas', isProficient: false }
];

export const influenceProficiencies: IProficiency[] = [
{ id: 'persuasion', name: 'Persuasão', skillId: 'influenceSkill', value: 0, description: 'Convencer, negociar, influenciar', isProficient: false },
{ id: 'intimidation', name: 'Intimidação', skillId: 'influenceSkill', value: 0, description: 'Ameaças, presença imponente', isProficient: false },
{ id: 'deception', name: 'Enganação', skillId: 'influenceSkill', value: 0, description: 'Mentiras, disfarces, falsas identidades', isProficient: false },
{ id: 'leadership', name: 'Liderança', skillId: 'influenceSkill', value: 0, description: 'Motivar, comandar grupos', isProficient: false },
{ id: 'psychology', name: 'Psicologia', skillId: 'influenceSkill', value: 0, description: 'Analisar comportamentos, manipulação emocional', isProficient: false }
];