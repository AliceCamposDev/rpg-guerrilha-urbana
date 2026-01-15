import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphViewerComponent } from './features/book/graph-view/graph-view';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, GraphViewerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rpg-guerrilha-urbana');
}
