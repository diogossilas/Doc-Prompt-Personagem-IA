export type FlowOperator = '──>' | '──' | string;

export interface SubsectionItem {
  id: number;
  tag: string;
  title: string;
  phaseId: number;
  phaseName: string;
  injectionOrder: number;
  inputVector: string;
  process: string;
  outputVector: string;
  equation: string;
  flowRole: string; // Explica o encadeamento e a relação analítica (──>)
  paragraphs: string[];
  operationalRole: string;
  systemicConstraint: string;
  exampleSnippet: string;
}

export interface PhaseInfo {
  id: number;
  code: string;
  name: string;
  subtitle: string;
  anchorType: string;
  description: string;
  tags: string[];
  flowRelation: string;
}

export interface OperationalStep {
  step: string;
  name: string;
  roleDescription: string;
  actions: string[];
  checkpoint: string;
}

export interface PersonaPreset {
  id: string;
  name: string;
  designation: string;
  role: string;
  theater: string;
  objective: string;
  tagsSummary: Record<string, string>;
}

export interface ScenarioSimulation {
  id: string;
  name: string;
  stimulus: string;
  flowChain: Array<{
    node: string;
    flowOperator: FlowOperator;
    description: string;
    state: 'active' | 'inhibited' | 'enforced';
  }>;
  terminalOutput: string;
}
