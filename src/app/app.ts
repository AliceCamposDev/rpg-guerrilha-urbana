import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphViewerComponent } from './features/book/graph-view/graph-view';
import { NoteViewer } from './components/note-viewer/note-viewer';
import { Header } from './components/header/header';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,NoteViewer, CommonModule, GraphViewerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rpg-guerrilha-urbana');

  selectedNoteName: string | null = null;
  noteContent: string = '';
  isLoading: boolean = false;

  onNoteSelected(noteName: string): void {
  console.log('📩 Evento recebido no pai:', noteName);
  this.selectedNoteName = noteName;
    
    // Opcional: carregar conteúdo automaticamente
    // this.loadNoteContent();
  }
}

