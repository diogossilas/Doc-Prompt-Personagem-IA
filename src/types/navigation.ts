export type PageId = 'diagram' | 'subsections' | 'flow-matrix' | 'generator' | 'operational';

export interface PageItem {
  id: PageId;
  num: number;
  title: string;
  shortTitle: string;
  desc: string;
}

export const APP_PAGES: PageItem[] = [
  { 
    id: 'diagram', 
    num: 1, 
    title: 'I. Diagrama Geral de Encadeamento da Informação', 
    shortTitle: 'Diagrama Geral', 
    desc: 'Progressão em cinco fases contínuas, contextualização do ambiente e alinhamento de premissas (──>)' 
  },
  { 
    id: 'subsections', 
    num: 2, 
    title: 'II. Análise Detalhada das 29 Subseções', 
    shortTitle: '29 Subseções', 
    desc: 'Guia analítico de 1.identity a 29.format_hint com encadeamento causal claro (──>)' 
  },
  { 
    id: 'flow-matrix', 
    num: 3, 
    title: 'III. Matriz de Encadeamento e Relações (──>)', 
    shortTitle: 'Matriz de Encadeamento', 
    desc: 'Relações de causa e efeito (──>), filtros de consistência e simulação analítica de cenários' 
  },
  { 
    id: 'generator', 
    num: 4, 
    title: 'IV. Gerador de Dossiê & Relatório Analítico', 
    shortTitle: 'Gerador de Dossiê', 
    desc: 'Síntese informativa estruturada, ajuste de parâmetros de texto e exportação editorial' 
  },
  { 
    id: 'operational', 
    num: 5, 
    title: 'V. Metodologia de Produção & Verificação de Coerência', 
    shortTitle: 'Verificação de Coerência', 
    desc: 'Etapas analíticas sucessivas, critérios de validação editorial e salvaguardas de estabilidade' 
  },
];
