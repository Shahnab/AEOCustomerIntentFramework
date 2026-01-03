export interface Entry {
  keyword: string | null;
  prompt: string;
}

export interface Topic {
  topic: string;
  entries: Entry[];
}

export interface SimulationData {
  version: string;
  topics: Topic[];
}

export interface HierarchyNode {
  name: string;
  value?: number;
  type: 'root' | 'topic' | 'keyword';
  children?: HierarchyNode[];
}