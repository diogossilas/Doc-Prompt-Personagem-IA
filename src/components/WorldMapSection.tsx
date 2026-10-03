import React, { useState } from 'react';
import { SUBSECTIONS_DATA, SubsectionItem } from '../data/reportData';
import { Globe, MapPin, ExternalLink, Compass, Cpu, Radio, Shield } from 'lucide-react';

export interface WorldMapNode {
  id: number;
  country: string;
  locationName: string;
  continent: string;
  lat: number;
  lng: number;
  xPct: number; // 0 to 100 percentage in equirectangular projection
  yPct: number; // 0 to 100 percentage
  tacticalRationale: string;
}

export const WORLD_NODES: WorldMapNode[] = [
  { id: 1, country: 'Reino Unido', locationName: 'Londres (Greenwich)', continent: 'Europa', lat: 51.5, lng: -0.1, xPct: 48.5, yPct: 28.5, tacticalRationale: 'Meridiano zero de ancoragem e certidão formal da entidade.' },
  { id: 2, country: 'Estados Unidos', locationName: 'Washington D.C.', continent: 'América do Norte', lat: 38.9, lng: -77.0, xPct: 28.2, yPct: 35.8, tacticalRationale: 'Centro de comando institucional e atribuição funcional de papéis pragmáticos.' },
  { id: 3, country: 'Grécia', locationName: 'Atenas', continent: 'Europa', lat: 37.9, lng: 23.7, xPct: 53.6, yPct: 36.2, tacticalRationale: 'Berço da historiografia clássica e matriz diacrônica de causa-efeito.' },
  { id: 4, country: 'Rússia', locationName: 'Sibéria (Taimyr)', continent: 'Ásia/Eurásia', lat: 68.0, lng: 95.0, xPct: 69.8, yPct: 18.2, tacticalRationale: 'Hostilidade climática extrema e barreira de plausibilidade física e termodinâmica.' },
  { id: 5, country: 'Suíça', locationName: 'Genebra', continent: 'Europa', lat: 46.2, lng: 6.1, xPct: 49.8, yPct: 31.5, tacticalRationale: 'Convergência diplomática estrita e fixação de estado-alvo terminal verificável.' },
  { id: 6, country: 'Alemanha', locationName: 'Berlim', continent: 'Europa', lat: 52.5, lng: 13.4, xPct: 51.2, yPct: 27.8, tacticalRationale: 'Motor interno de resiliência e pulsões profundas de reconstrução histórica.' },
  { id: 7, country: 'Itália', locationName: 'Roma', continent: 'Europa', lat: 41.9, lng: 12.5, xPct: 50.8, yPct: 34.0, tacticalRationale: 'Distorção trágica de julgamento, vício estrutural e atrito dramático orgânico.' },
  { id: 8, country: 'Japão', locationName: 'Tóquio', continent: 'Ásia', lat: 35.6, lng: 139.7, xPct: 83.5, yPct: 37.8, tacticalRationale: 'Inventário estrito de treinamento prático e hiper-especialização técnica.' },
  { id: 9, country: 'França', locationName: 'Paris', continent: 'Europa', lat: 48.8, lng: 2.3, xPct: 48.8, yPct: 30.2, tacticalRationale: 'Saliência semiótica de vestuário, registro corpóreo e alto contraste visual.' },
  { id: 10, country: 'Áustria', locationName: 'Viena', continent: 'Europa', lat: 48.2, lng: 16.3, xPct: 52.1, yPct: 30.5, tacticalRationale: 'Microcomportamentos biomecânicos e sinalizadores motores de sobrecarga psíquica.' },
  { id: 11, country: 'Irlanda', locationName: 'Dublin', continent: 'Europa', lat: 53.3, lng: -6.2, xPct: 46.8, yPct: 27.2, tacticalRationale: 'Prosódia literária, métrica oratória precisa e envelope prosódico de sintaxe.' },
  { id: 12, country: 'Índia', locationName: 'Nova Délhi', continent: 'Ásia', lat: 28.6, lng: 77.2, xPct: 65.5, yPct: 42.5, tacticalRationale: 'Sistema axiológico inegociável e repulsa a anacronismos contemporâneos.' },
  { id: 13, country: 'Noruega', locationName: 'Svalbard (Ártico)', continent: 'Europa/Ártico', lat: 78.2, lng: 15.6, xPct: 51.8, yPct: 12.5, tacticalRationale: 'Ameaça existencial profunda e preservação de dados sob frio absoluto.' },
  { id: 14, country: 'Islândia', locationName: 'Reykjavik', continent: 'Europa/Atlântico', lat: 64.1, lng: -21.9, xPct: 43.5, yPct: 21.0, tacticalRationale: 'Isolamento de dados críticos e oclusão de segredos táticos sob censura.' },
  { id: 15, country: 'Brasil', locationName: 'Brasília', continent: 'América do Sul', lat: -15.7, lng: -47.9, xPct: 35.8, yPct: 62.5, tacticalRationale: 'Teia de mediação relacional, alianças de honra e ponderação de redes sociais.' },
  { id: 16, country: 'Oriente Médio', locationName: 'Jerusalém', continent: 'Ásia/Oriente Médio', lat: 31.7, lng: 35.2, xPct: 56.5, yPct: 40.0, tacticalRationale: 'Impasse insolúvel da psique e suspensão da tomada automática de decisões.' },
  { id: 17, country: 'Taiwan', locationName: 'Estreito de Taiwan', continent: 'Ásia', lat: 24.0, lng: 121.0, xPct: 78.5, yPct: 45.0, tacticalRationale: 'Prensa mecânica geopolítica e oposição contínua forçando reatividade tática.' },
  { id: 18, country: 'Egito', locationName: 'Cairo', continent: 'África', lat: 30.0, lng: 31.2, xPct: 55.2, yPct: 41.2, tacticalRationale: 'Vetor de transformação temporal milenar e curvatura de aprendizado com perdas.' },
  { id: 19, country: 'Panamá', locationName: 'Canal do Panamá', continent: 'América Central', lat: 9.0, lng: -79.5, xPct: 27.5, yPct: 51.0, tacticalRationale: 'Ponto crítico de estrangulamento e curto-circuito executivo sob estímulo de trauma.' },
  { id: 20, country: 'China', locationName: 'Pequim', continent: 'Ásia', lat: 39.9, lng: 116.4, xPct: 77.2, yPct: 35.2, tacticalRationale: 'Régua cronológica contínua com marcações métricas absolutas contra anacronismos.' },
  { id: 21, country: 'Suécia', locationName: 'Estocolmo', continent: 'Europa', lat: 59.3, lng: 18.0, xPct: 52.8, yPct: 23.5, tacticalRationale: 'Instrumentos materiais funcionais finitos e catalisadores táteis de precisão.' },
  { id: 22, country: 'Antártica', locationName: 'Polo Sul (Amundsen-Scott)', continent: 'Antártica', lat: -90.0, lng: 0.0, xPct: 50.0, yPct: 91.0, tacticalRationale: 'Fronteira termodinâmica inviolável e abismo exterior onde a agência física se anula.' },
  { id: 23, country: 'Coreia do Sul', locationName: 'Seul', continent: 'Ásia', lat: 37.5, lng: 126.9, xPct: 80.2, yPct: 36.8, tacticalRationale: 'Potência inata cibernética e de ruptura atrelada a tributo metabólico imediato.' },
  { id: 24, country: 'Países Baixos', locationName: 'Haia (Tribunal Penal)', continent: 'Europa', lat: 52.0, lng: 4.3, xPct: 49.3, yPct: 28.0, tacticalRationale: 'Código de governança e mecanismos de veto ético obrigatórios pré-síntese.' },
  { id: 25, country: 'Marrocos', locationName: 'Saara / Merzouga', continent: 'África', lat: 31.0, lng: -4.0, xPct: 47.5, yPct: 40.5, tacticalRationale: 'Hiper-densidade sensorial de ozônio, calor e texturas táteis que rompem a abstração.' },
  { id: 26, country: 'Canadá', locationName: 'Alert (Nunavut)', continent: 'América do Norte', lat: 82.5, lng: -62.3, xPct: 31.5, yPct: 10.0, tacticalRationale: 'Ponto de observação angular estrito sem onisciência telepática sobre terceiros.' },
  { id: 27, country: 'África do Sul', locationName: 'Cidade do Cabo', continent: 'África', lat: -33.9, lng: 18.4, xPct: 53.0, yPct: 75.0, tacticalRationale: 'Convergência de correntes oceânicas e amostra-padrão viva com atrito real (few-shot).' },
  { id: 28, country: 'Austrália', locationName: 'Pine Gap (Território Norte)', continent: 'Oceania', lat: -23.7, lng: 133.8, xPct: 82.0, yPct: 68.0, tacticalRationale: 'Sistema de vigilância global e circunlocução científica sem recusa moralista de IA.' },
  { id: 29, country: 'Cingapura', locationName: 'Porto de Cingapura', continent: 'Ásia', lat: 1.3, lng: 103.8, xPct: 73.8, yPct: 55.5, tacticalRationale: 'Topologia gráfica ultra-estruturada, precisão tabular e contrato de saída final.' },
];

interface WorldMapSectionProps {
  playBlip: () => void;
  playChirp: () => void;
  onNavigateToSubsection: (tag: string) => void;
}

export const WorldMapSection: React.FC<WorldMapSectionProps> = ({
  playBlip,
  playChirp,
  onNavigateToSubsection,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<number>(1);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [continentFilter, setContinentFilter] = useState<string>('all');

  const selectedNode = WORLD_NODES.find((n) => n.id === selectedNodeId) || WORLD_NODES[0];
  const selectedSubsection = SUBSECTIONS_DATA.find((s) => s.id === selectedNode.id) || SUBSECTIONS_DATA[0];

  const filteredNodes = WORLD_NODES.filter((n) => {
    if (continentFilter === 'all') return true;
    return n.continent.toLowerCase().includes(continentFilter.toLowerCase());
  });

  const handleNodeClick = (node: WorldMapNode) => {
    playChirp();
    setSelectedNodeId(node.id);
  };

  return (
    <div className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
      {/* Overview Title */}
      <div className="mb-6 border-b border-slate-800/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <Globe className="w-3.5 h-3.5" />
          <span>VISÃO GLOBAL TÁTICA</span>
          <span aria-hidden="true">·</span>
          <span>DISTRIBUIÇÃO GEOPOLÍTICA DOS 29 NÓS COT</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-bold font-display text-white tracking-wide uppercase">
          MAPA GLOBAL DE RESTRIÇÕES VETORIAIS
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
          Cada uma das 29 subseções do sistema foi mapeada geograficamente para coordenadas e postos globais específicos, fundamentando a lógica psicodinâmica em ancoragens físicas, históricas e operacionais de cada continente.
        </p>
      </div>

      {/* Continent Filter Micro-buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 uppercase text-[11px] mr-1">Filtrar Região:</span>
          {['all', 'Europa', 'América', 'Ásia', 'África', 'Oceania', 'Antártica'].map((region) => (
            <button
              key={region}
              onClick={() => {
                playBlip();
                setContinentFilter(region);
              }}
              className={`px-2.5 py-1 text-[11px] tracking-wider transition-colors cursor-pointer border ${
                continentFilter === region
                  ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300 font-semibold'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {region === 'all' ? 'Planeta Inteiro (29)' : region}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-400">
          NÓ SELECIONADO: <span className="text-cyan-400 font-bold tabular-nums">#{selectedNode.id} - {selectedNode.country}</span>
        </div>
      </div>

      {/* Main World Map Container */}
      <div className="border border-slate-800 bg-[#070B13] p-2 sm:p-4 mb-6 relative corner-crosshairs overflow-hidden">
        {/* Horizontal Laser Scanning Line */}
        <div className="anim-laser-line" />

        {/* Tactical Coordinates HUD Header */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500 border-b border-slate-800/80 pb-2 mb-3">
          <div className="flex items-center gap-3">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">GRID TÁTICO WGS84 // PROJEÇÃO EQUIRETANGULAR</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>LAT: {selectedNode.lat.toFixed(2)}°</span>
            <span>LNG: {selectedNode.lng.toFixed(2)}°</span>
            <span>SETOR: {selectedNode.continent.toUpperCase()}</span>
          </div>
        </div>

        {/* Vector World Map Stage */}
        <div className="relative w-full aspect-[2/1] min-h-[300px] sm:min-h-[440px] bg-[#05080E] border border-slate-900 overflow-hidden select-none">
          {/* Subtle Lat/Long Grid Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/10 stroke-[0.7]" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Latitude parallels */}
            <line x1="0" y1="20" x2="100" y2="20" strokeDasharray="1 3" />
            <line x1="0" y1="35" x2="100" y2="35" strokeDasharray="1 3" />
            <line x1="0" y1="50" x2="100" y2="50" className="stroke-cyan-500/20" /> {/* Equator */}
            <line x1="0" y1="65" x2="100" y2="65" strokeDasharray="1 3" />
            <line x1="0" y1="80" x2="100" y2="80" strokeDasharray="1 3" />
            {/* Longitude meridians */}
            <line x1="20" y1="0" x2="20" y2="100" strokeDasharray="1 3" />
            <line x1="35" y1="0" x2="35" y2="100" strokeDasharray="1 3" />
            <line x1="50" y1="0" x2="50" y2="100" className="stroke-cyan-500/20" /> {/* Prime Meridian */}
            <line x1="65" y1="0" x2="65" y2="100" strokeDasharray="1 3" />
            <line x1="80" y1="0" x2="80" y2="100" strokeDasharray="1 3" />

            {/* Stylized Tactical Continental Wireframe Outlines */}
            {/* North America */}
            <path
              d="M 14,14 L 28,12 L 36,15 L 34,26 L 31,34 L 28,45 L 26,52 L 20,44 L 18,36 L 14,32 L 12,22 Z"
              fill="rgba(56, 189, 248, 0.025)"
              stroke="rgba(56, 189, 248, 0.28)"
              strokeWidth="0.8"
            />
            {/* South America */}
            <path
              d="M 27,53 L 34,54 L 38,62 L 36,72 L 31,84 L 28,78 L 26,64 Z"
              fill="rgba(56, 189, 248, 0.025)"
              stroke="rgba(56, 189, 248, 0.28)"
              strokeWidth="0.8"
            />
            {/* Europe */}
            <path
              d="M 46,24 L 54,22 L 56,30 L 52,36 L 47,35 L 45,30 Z"
              fill="rgba(56, 189, 248, 0.025)"
              stroke="rgba(56, 189, 248, 0.28)"
              strokeWidth="0.8"
            />
            {/* Africa */}
            <path
              d="M 45,38 L 56,38 L 58,48 L 55,64 L 52,76 L 49,66 L 44,52 L 43,44 Z"
              fill="rgba(56, 189, 248, 0.025)"
              stroke="rgba(56, 189, 248, 0.28)"
              strokeWidth="0.8"
            />
            {/* Eurasia / Asia */}
            <path
              d="M 56,22 L 72,16 L 86,22 L 85,38 L 78,48 L 72,56 L 68,46 L 62,42 L 57,32 Z"
              fill="rgba(56, 189, 248, 0.025)"
              stroke="rgba(56, 189, 248, 0.28)"
              strokeWidth="0.8"
            />
            {/* Australia */}
            <path
              d="M 78,64 L 86,63 L 88,72 L 80,75 L 76,70 Z"
              fill="rgba(56, 189, 248, 0.025)"
              stroke="rgba(56, 189, 248, 0.28)"
              strokeWidth="0.8"
            />
            {/* Antarctica */}
            <path
              d="M 20,93 L 80,93 L 75,89 L 25,89 Z"
              fill="rgba(56, 189, 248, 0.025)"
              stroke="rgba(56, 189, 248, 0.28)"
              strokeWidth="0.8"
            />
          </svg>

          {/* Render 29 Interactive Nodes on the Map */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;

            return (
              <div
                key={node.id}
                style={{
                  left: `${node.xPct}%`,
                  top: `${node.yPct}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* Ripple radar pulse for selected node */}
                {isSelected && (
                  <div className="absolute inset-0 -m-2 rounded-full border border-cyan-400 animate-ping pointer-events-none opacity-70" />
                )}

                {/* Point Marker */}
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-none flex items-center justify-center font-mono text-[9px] font-bold transition-all border ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 border-white shadow-[0_0_12px_rgba(6,182,212,0.9)] scale-125'
                      : isHovered
                      ? 'bg-cyan-900 text-cyan-200 border-cyan-400 scale-110'
                      : 'bg-slate-900 text-cyan-400 border-slate-700/80 hover:border-cyan-500'
                  }`}
                >
                  {node.id}
                </div>

                {/* Label hover tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 whitespace-nowrap bg-slate-950/95 border border-cyan-500/60 px-2 py-0.5 text-[10px] font-mono text-cyan-300 pointer-events-none transition-opacity z-30 ${
                    isHovered || isSelected ? 'opacity-100' : 'opacity-0 hidden sm:block'
                  }`}
                >
                  <span className="font-bold">#{node.id}</span> {node.country}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Selection Status Bar below map */}
        <div className="mt-2 text-[10px] sm:text-xs font-mono text-slate-500 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
          <span>* CLIQUE EM QUALQUER UM DOS 29 PONTOS PARA INSPECIONAR O NÓ GEOPOLÍTICO</span>
          <span>TOTAL: 29 SUBSEÇÕES MAPEADAS</span>
        </div>
      </div>

      {/* Selected Node Detailed Dossier Card */}
      <div className="border border-cyan-900/60 bg-[#0B101D] p-4 sm:p-6 relative corner-crosshairs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-mono font-bold bg-cyan-950 border border-cyan-500 text-cyan-300 tabular-nums">
              NÓ #{selectedNode.id < 10 ? `0${selectedNode.id}` : selectedNode.id}
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white uppercase tracking-wide">
                {selectedSubsection.title} &lt;{selectedSubsection.tag}&gt;
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-200 font-semibold">{selectedNode.country}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedNode.locationName}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedNode.continent}</span>
              </div>
            </div>
          </div>

          {/* Action button: Jump directly to full subsection */}
          <button
            onClick={() => {
              playChirp();
              onNavigateToSubsection(selectedSubsection.tag);
            }}
            className="px-3.5 py-1.5 text-xs font-mono tracking-wider font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>VER SUBSEÇÃO COMPLETA</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vector Transformation Formula */}
        <div className="p-3 bg-[#080C14] border border-slate-800 mb-4 font-mono text-xs">
          <div className="text-[10px] text-cyan-400/80 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400" />
            EQUAÇÃO DE TRANSFORMAÇÃO VETORIAL
          </div>
          <div className="text-cyan-300 font-bold overflow-x-auto py-0.5">
            {selectedSubsection.equation}
          </div>
        </div>

        {/* Analytical Justification and Operational Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] font-mono text-cyan-400 uppercase mb-1.5 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              JUSTIFICATIVA GEOPOLÍTICA E ANCORAGEM
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedNode.tacticalRationale}
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] font-mono text-cyan-400 uppercase mb-1.5 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              PAPEL NO GRAFO COGNITIVO
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedSubsection.operationalRole}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
