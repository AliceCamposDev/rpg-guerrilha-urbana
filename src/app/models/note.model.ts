export interface NoteMetadata {
  abs_filepath: string;
  created: string;
  modified: string;
  backlinks_count: number;
  outgoing_links_count: number;
  tags: string[];
  word_count: number;
}

export interface Note {
  name: string;
  content: string;
  metadata: NoteMetadata;
}

export interface GraphNode {
  id: string;
  label: string;
  degree: number;
  group?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  stats: {
    total_notes: number;
    total_links: number;
  };
}