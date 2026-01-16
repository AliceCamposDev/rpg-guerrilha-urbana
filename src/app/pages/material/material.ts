import { Component } from '@angular/core';
import { GraphViewerComponent } from '../../features/book/graph-view/graph-view';
import { NoteViewer } from '../../components/note-viewer/note-viewer';

@Component({
  selector: 'app-material',
  imports: [GraphViewerComponent, NoteViewer],
  templateUrl: './material.html',
  styleUrl: './material.css',
})
export class Material {
  selectedNoteName: string | null = null;
  noteContent: string = '';
  isLoading: boolean = false;

  onNoteSelected(noteName: string): void {
    console.log('Evento recebido no pai:', noteName);
    this.selectedNoteName = noteName;
  }
}
