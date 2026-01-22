import { Routes } from '@angular/router';
import { Material } from './pages/material/material';
import { CharacterSheet } from './pages/character-sheet/character-sheet';

export const routes: Routes = [
  { path: 'character-sheet', component: CharacterSheet },
  { path: 'rpg-guerrilha-urbana', component: Material },
  { path: '', component: Material },
];