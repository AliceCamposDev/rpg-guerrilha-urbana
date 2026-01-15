import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import cytoscape, { Core } from 'cytoscape';
import { GraphData, GraphNode, GraphEdge } from '../../../models/note.model';
import { ApiService } from '../../../services/obsidian_api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph-view',
  imports: [CommonModule],
  templateUrl: './graph-view.html',
  styleUrls: ['./graph-view.css']
})

export class GraphViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('graphContainer') graphContainer!: ElementRef;

  @Output() noteSelected = new EventEmitter<string>();
  selectedNodeId: string | null = null; 
  private cy!: Core;
  loading = true;
  error: string | null = null;
  graphData: GraphData | null = null;

  // Configurações do layout
  layoutConfig = {
    name: 'cose' as const,
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: false,
    padding: 50,
    randomize: true,
    componentSpacing: 100,
    nodeRepulsion: 2500000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 0,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0,
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadGraph();
  }

  ngAfterViewInit(): void {
    // Wait for data to be loaded and container to be rendered
    if (this.graphData) {
      this.initGraph();
    }
  }

  loadGraph(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getGraphData().subscribe({
      next: (data) => {
        this.graphData = data;
        this.loading = false;

        // Initialize graph after data is loaded and view is rendered
        setTimeout(() => {
          if (this.graphContainer && this.graphContainer.nativeElement.offsetHeight > 0) {
            this.initGraph();
          } else {
            // Retry if container doesn't have dimensions yet
            setTimeout(() => this.initGraph(), 300);
          }
        }, 100);
      },
      error: (err) => {
        this.error = `Erro ao carregar gráfico: ${err.message}`;
        this.loading = false;
        console.error('Graph loading error:', err);
      },
    });
  }

  private initGraph(): void {
    if (!this.graphData || !this.graphContainer) {
      return;
    }

    try {
      const container = this.graphContainer.nativeElement;
      
      // Ensure container has dimensions
      if (container.offsetHeight === 0 || container.offsetWidth === 0) {
        console.warn('Container does not have valid dimensions');
        return;
      }

      // Destroy existing instance if it exists
      if (this.cy) {
        this.cy.destroy();
      }

      // Converte dados para formato Cytoscape
      const elements = this.prepareGraphElements();

      // Inicializa Cytoscape
      this.cy = cytoscape({
        container: container,
        elements: elements,
        style: this.getGraphStyle(),
        layout: this.layoutConfig,
        minZoom: 0.1,
        maxZoom: 3,
        boxSelectionEnabled: true,
      });

      this.setupGraphInteractions();

      // Ajusta visualização
      setTimeout(() => {
        this.cy.fit();
      }, 500);
    } catch (error) {
      console.error('Error initializing graph:', error);
      this.error = 'Erro ao renderizar gráfico';
    }
  }

  private prepareGraphElements(): any[] {
    if (!this.graphData) return [];

    const nodes = this.graphData.nodes.map((node) => ({
      data: {
        id: node.id,
        label: node.label,
        degree: node.degree,
        group: node.group || 'default',
      },
    }));

    const edges = this.graphData.edges.map((edge) => ({
      data: {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        weight: 1,
      },
    }));

    return [...nodes, ...edges];
  }

  private getGraphStyle(): any[] {
    return [
      // Estilo para nós
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'text-valign': 'center',
          'text-align': 'center',
          'text-weight': 'bold', 
          'font-size': '20px',
          'width': '80px',
          'height': '80px',
          'background-color': 'rgba(99, 0, 0, 1)',
          'color': '#ffffff',
          'text-wrap': 'wrap',
          'text-max-width': '300px',
          'opacity': '1',
        },
      },

      // Estilo para nós selecionados
      {
        selector: 'node:selected',
        style: {
          'background-color': '#ad0000ff',
          'border-color': '#000000ff',
          'border-width': 2,
        },
      },

      // Estilo para arestas
      {
        selector: 'edge',
        style: {
          width: 1.5,
          'line-color': '#9ca3af',
          'target-arrow-color': '#9ca3af',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          opacity: 0.6,
        },
      },

      // Estilo para arestas quando hover no nó
      {
        selector: 'edge:selected',
        style: {
          width: 3,
          'line-color': '#ef4444',
          'target-arrow-color': '#ef4444',
          opacity: 1,
        },
      },
    ];
  }

  private setupGraphInteractions(): void {
    // Hover effects
    this.cy.on('mouseover', 'node', (evt) => {
      const node = evt.target;
      node.style('background-color', '#ef4444');

      // Destaca nós conectados
      node.neighborhood().nodes().style('opacity', 1);
      node.neighborhood().edges().style('opacity', 1);

      // Diminui opacidade de outros nós
    });

    this.cy.on('mouseout', 'node', (evt) => {
      const node = evt.target;

      // Restaura cores baseadas no grau

      // Restaura opacidade de todos os elementos
      this.cy.elements().style('opacity', 1);
    });

    // Click para selecionar
    this.cy.on('tap', 'node', (evt) => {
        const node = evt.target;
        const nodeId = node.id();
        const noteName = nodeId.replace('.md', '');  // Extrai nome limpo
        
        // Remove destaque anterior
        this.cy.elements().removeClass('highlighted');
        
        // Destaca o nó clicado e suas conexões
        node.addClass('highlighted');
        node.neighborhood().addClass('highlighted');
        
        // Atualiza o nó selecionado
        this.selectedNodeId = nodeId;
        
        // EMITE O EVENTO PARA O COMPONENTE PAI  ← AÇÃO PRINCIPAL
        this.noteSelected.emit(noteName);
        
        console.log('Nota selecionada:', noteName);
    });

    // Zoom com roda do mouse
    this.cy.on('wheel', (evt) => {
      evt.preventDefault();
    });
  }

  // Métodos públicos para controle
  fitGraph(): void {
    if (this.cy) {
      this.cy.fit();
    }
  }

  resetGraph(): void {
    if (this.cy) {
      this.cy.elements().style('opacity', 1).removeClass('highlighted');
      this.cy.layout(this.layoutConfig).run();
      setTimeout(() => this.fitGraph(), 100);
    }
  }

  changeLayout(layoutName: string): void {
    if (this.cy) {
      const layout = { ...this.layoutConfig, name: layoutName as any };
      this.cy.layout(layout).run();
    }
  }

  getSelectedNodes(): string[] {
    if (!this.cy) return [];
    return this.cy.$('node:selected').map((node) => node.id());
  }
}