import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/obsidian_api.service';

@Component({
  selector: 'app-note-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-viewer.html',
  styleUrls: ['./note-viewer.css']
})
export class NoteViewer implements OnChanges {
  @Input() noteName: string | null = null;
  
  noteContent: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  noteMetadata: any = null;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['noteName'] && this.noteName) {
      this.loadNoteContent(this.noteName);
    }
  }

  loadNoteContent(noteName: string): void {
    this.isLoading = true;
    this.error = null;
    this.noteContent = '';
    this.noteMetadata = null;
    
    this.apiService.getNoteContent(noteName).subscribe({
      next: (response: any) => {
        this.noteContent = response.content || '';
        this.noteMetadata = response.metadata || {};
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Erro ao carregar nota: ${err.message}`;
        this.isLoading = false;
      }
    });
  }

  formatContent(content: string): string {
    // Converte markdown básico para HTML
    let formatted = content
      .replace(/\[\[(.*?)\]\]/g, '<span class="internal-link">$1</span>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    
    return `<p>${formatted}</p>`;
  }
}