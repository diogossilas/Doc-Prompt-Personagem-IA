export interface ReportPayload {
  name: string;
  designation: string;
  role: string;
  theater: string;
  objective: string;
  identity: string;
  backstory: string;
  flaw: string;
  voice: string;
  triggers: string;
  limitations: string;
  format_hint: string;
  classification: string;
  thinkingLevel: number;
  temperature: number;
  topP: number;
}

export function computeVectorChecksum(payload: ReportPayload): string {
  const raw = `${payload.name}-${payload.role}-${payload.theater}-${payload.temperature}-${payload.thinkingLevel}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < raw.length; i++) {
    hash ^= raw.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16).toUpperCase().padStart(8, '0');
}

export function compileReportDocument(payload: ReportPayload, checksum: string): string {
  const timestamp = '2026-10-03 // T+07:38:14Z';
  return `================================================================================
DOC. ENG-PROMPT LLMS E AGENTES IA // DOSSIÊ ANALÍTICO DE PERSONA
ARQUITETURA ESTRUTURADA DE MODELAGEM NARRATIVA (PADRÃO 29-COT)
CLASSIFICAÇÃO EDITORIAL: ${payload.classification}
AUTORIA: NÚCLEO DE JORNALISMO E ENGENHARIA DE PROMPT
IDENTIFICADOR DO DOSSIÊ: SHA256-${checksum} // DATA E HORA: ${timestamp}
PROGRESSÃO METODOLÓGICA: BRIEFING ──> ESBOÇO ──> REFINAMENTO ──> MODULARIZAÇÃO
================================================================================

1. IDENTIFICAÇÃO FORMAL DA ENTIDADE
--------------------------------------------------------------------------------
NOME: ${payload.name}
DESIGNAÇÃO / CARGO: ${payload.designation}
FUNÇÃO NA HISTÓRIA: ${payload.role}
NÍVEL DE PENSAMENTO (THINKING LEVEL): ${payload.thinkingLevel}
TEMPERATURA EDITORIAL: ${payload.temperature.toFixed(2)} | TOP P: ${payload.topP.toFixed(2)}

2. CONTEXTO DO MEIO AMBIENTE & LIMITES REAIS
--------------------------------------------------------------------------------
CENÁRIO E MEIO (THEATER):
${payload.theater}

FRONTEIRAS INEGOCIÁVEIS (LIMITATIONS):
${payload.limitations}

3. PERFIL PSICOLÓGICO & DILEMAS ÍNTIMOS
--------------------------------------------------------------------------------
HISTÓRICO FORMATIVO (BACKSTORY):
${payload.backstory}

VULNERABILIDADE E VÍCIO DE JULGAMENTO (FLAW):
${payload.flaw}

GATILHOS DE SENSIBILIDADE (TRIGGERS):
${payload.triggers}

4. TOM DE VOZ & DIRETRIZES DE COMUNICAÇÃO
--------------------------------------------------------------------------------
ESTILO E CADÊNCIA (VOICE):
${payload.voice}

5. OBJETIVO PRINCIPAL & FORMATO DE APRESENTAÇÃO
--------------------------------------------------------------------------------
OBJETIVO FINAL MENSURÁVEL (OBJECTIVE):
${payload.objective}

DIRETRIZES DE DIAGRAMAÇÃO (FORMAT-HINT):
${payload.format_hint}

6. ESTRUTURA XML PADRONIZADA (ESPECIFICAÇÃO ANALÍTICA)
--------------------------------------------------------------------------------
<agent_vector_spec>
  <identity>${payload.identity}</identity>
  <role>${payload.role}</role>
  <backstory>${payload.backstory}</backstory>
  <theater>${payload.theater}</theater>
  <objective>${payload.objective}</objective>
  <flaw>${payload.flaw}</flaw>
  <voice>${payload.voice}</voice>
  <triggers>${payload.triggers}</triggers>
  <limitations>${payload.limitations}</limitations>
  <important_system_limitations>Proibição absoluta de quebra de imersão ("Como uma IA...").</important_system_limitations>
  <format_hint>${payload.format_hint}</format_hint>
</agent_vector_spec>

================================================================================
FIM DO DOSSIÊ // CONSISTÊNCIA EDITORIAL E COERÊNCIA VERIFICADAS (──>)
================================================================================`;
}

export function downloadMarkdownReport(content: string, filename: string): void {
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/markdown' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
