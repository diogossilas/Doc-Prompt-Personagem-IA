export interface ArchitecturalStage {
  id: 'brief' | 'sketch' | 'studio' | 'modularization';
  stepNum: number;
  name: string;
  subtitle: string;
  responsibility: string; // Separation of Concerns
  llmApplication: string; // Application in LLMs and AI Agents
  deliverables: string[];
}

export const ARCHITECTURAL_LIFECYCLE: ArchitecturalStage[] = [
  {
    id: 'brief',
    stepNum: 1,
    name: 'Briefing (Contextualização)',
    subtitle: 'Diretrizes Iniciais e Escopo',
    responsibility: 'Mapeamento das necessidades do projeto, objetivos finais da persona e limites do cenário (<theater>, <rules>).',
    llmApplication: 'Formulação de premissas claras de alto nível e ancoragem contextual sem divagações.',
    deliverables: ['Definição de objetivos claros', 'Fronteiras físicas e institucionais', 'Papel funcional da persona']
  },
  {
    id: 'sketch',
    stepNum: 2,
    name: 'Esboço (Perfil Narrativo)',
    subtitle: 'Estruturação Humana e Conflitos',
    responsibility: 'Construção da bagagem pessoal: fatos marcantes do passado, vulnerabilidades reais e dilemas éticos.',
    llmApplication: 'Mapeamento de tensões humanas críveis (<flaw>, <internal_conflict>, <backstory>) para conferir profundidade.',
    deliverables: ['Identidade e biografia essenciais', 'Pontos de vulnerabilidade reflexiva', 'Gatilhos de sensibilidade (<triggers>)']
  },
  {
    id: 'studio',
    stepNum: 3,
    name: 'Refinamento (Estilo & Tom)',
    subtitle: 'Ajuste de Prosódia e Exemplos',
    responsibility: 'Calibração dos parâmetros de redação (profundidade reflexiva, temperatura) e teste prático com cenas modelo.',
    llmApplication: 'Ajuste do tom de voz (<voice>), redação de trecho exemplar (<scene_sample>) e vocabulário técnico (<skills>).',
    deliverables: ['Equilíbrio de tom e sobriedade', 'Cena de referência redigida', 'Inventário de vocabulário aplicável']
  },
  {
    id: 'modularization',
    stepNum: 4,
    name: 'Modularização (Blocos Temáticos)',
    subtitle: 'Organização em 29 Unidades Coesas',
    responsibility: 'Divisão do sistema em 29 tópicos independentes, cada um focado em um aspecto específico do comportamento.',
    llmApplication: 'Garantia de que alterações em detalhes visuais (<appearance>) não afetem as normas de conduta (<rules>).',
    deliverables: ['Independência entre os blocos', 'Contrato de formato (<format_hint>)', 'Salvaguardas editoriais (<important_system_limitations>)']
  },
];
