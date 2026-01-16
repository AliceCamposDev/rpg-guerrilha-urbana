import { Routes } from '@angular/router';
import { CharacterSheetModule } from './features/character-sheet/character-sheet-module';
import { CharacterSheetView } from './features/character-sheet/components/character-sheet-view/character-sheet-view';
import { Material } from './pages/material/material';

export const routes: Routes = [
  { path: 'character-sheet', loadChildren: () => CharacterSheetModule },
  { path: '', component: Material },
];