import { Routes } from '@angular/router';
import { CharacterSheetModule } from './features/character-sheet/character-sheet-module';
import { CharacterSheetView } from './features/character-sheet/components/character-sheet-view/character-sheet-view';
import { HomeView } from './features/home/components/home-view/home-view';

export const routes: Routes = [
  { path: 'character-sheet', loadChildren: () => CharacterSheetModule },
  { path: '', component: HomeView },

];