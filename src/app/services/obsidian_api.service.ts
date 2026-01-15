import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note, GraphData } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; // Altere para seu backend

  constructor(private http: HttpClient) { }

  getGraphData(): Observable<GraphData> {
    return this.http.get<GraphData>(`${this.apiUrl}/api/graph`);
  }

  getAllNotes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notes`);
  }

  getNoteContent(noteName: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/api/note/${encodeURIComponent(noteName)}`);
  }

//   searchNotes(query: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/notes/search?q=${query}`);
//   }
}