import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

// Cidades atendidas no Paraná, posicionadas pelas COORDENADAS GEOGRÁFICAS REAIS
// (lat/long projetadas sobre o contorno oficial do estado — GeoJSON IBGE).
// abbr = sigla no marcador; name = nome completo (hover/toque).
type City = { abbr: string; name: string; x: number; y: number };

// Contorno real do Paraná (simplificado do GeoJSON oficial do IBGE),
// projetado na viewBox 480x320.
const PARANA_PATH = 'M 462.9,208.8 L 460.1,211.6 L 459.3,212.4 L 458.2,213.8 L 455.7,217.9 L 452.5,219.9 L 452.2,220.2 L 452.2,220.2 L 450.4,221.1 L 441.3,230.6 L 436.1,238.3 L 431.6,247.1 L 427.3,256.2 L 403.7,256.9 L 401.9,256.8 L 401.4,257.9 L 400.2,258.3 L 397.5,258.3 L 395.8,257.7 L 394.2,257.7 L 391.5,257.3 L 391.5,257.8 L 391.0,258.2 L 389.2,257.8 L 388.1,257.8 L 387.6,258.0 L 386.8,258.5 L 386.1,258.9 L 385.1,259.5 L 383.9,259.9 L 383.7,260.6 L 382.8,261.6 L 382.2,262.2 L 382.1,263.0 L 381.2,263.1 L 380.1,264.1 L 380.1,264.7 L 379.0,265.2 L 377.8,265.7 L 376.7,266.5 L 376.0,267.1 L 375.0,267.8 L 372.1,268.5 L 371.2,269.2 L 368.7,268.9 L 367.1,270.3 L 365.9,271.9 L 365.1,273.1 L 363.0,273.4 L 360.5,272.5 L 359.8,272.8 L 358.6,272.4 L 357.2,271.9 L 353.9,270.5 L 350.1,268.1 L 346.9,265.1 L 342.8,262.5 L 340.1,259.8 L 334.4,260.0 L 330.6,259.3 L 325.8,260.0 L 322.1,260.5 L 319.0,259.5 L 317.3,261.8 L 313.8,260.4 L 308.6,264.4 L 308.5,266.6 L 302.4,261.8 L 298.1,259.3 L 291.4,258.0 L 288.1,261.9 L 279.7,273.5 L 266.7,273.9 L 258.5,274.7 L 255.6,275.6 L 254.5,276.8 L 248.0,278.4 L 244.6,284.1 L 241.4,286.9 L 244.0,292.0 L 246.8,296.3 L 245.5,301.7 L 242.7,303.5 L 239.3,303.1 L 233.9,307.9 L 220.3,298.8 L 207.6,299.0 L 200.9,298.7 L 190.8,295.6 L 182.3,290.4 L 170.4,288.6 L 157.3,285.9 L 153.9,286.3 L 135.1,281.9 L 124.4,282.0 L 117.5,284.5 L 110.2,280.7 L 105.5,276.2 L 102.9,275.7 L 98.2,274.7 L 96.5,275.3 L 91.6,278.0 L 83.9,276.7 L 80.3,275.6 L 76.8,268.9 L 73.5,261.7 L 67.1,255.8 L 65.6,246.2 L 63.7,235.9 L 58.6,231.5 L 42.8,225.2 L 31.3,229.2 L 13.7,226.4 L 21.4,203.9 L 32.0,155.0 L 36.9,120.6 L 67.1,73.5 L 98.4,31.5 L 149.3,17.4 L 181.8,18.0 L 211.4,19.6 L 244.3,23.0 L 276.2,38.2 L 297.7,41.6 L 318.7,42.8 L 334.7,44.7 L 344.6,52.6 L 355.8,63.4 L 358.5,73.8 L 357.6,81.8 L 360.6,93.7 L 361.6,102.6 L 363.8,111.4 L 366.7,116.5 L 372.2,124.2 L 379.3,134.5 L 386.1,141.2 L 380.8,151.4 L 378.9,157.6 L 381.7,165.4 L 393.6,164.3 L 399.9,163.1 L 410.7,163.6 L 421.9,165.4 L 429.6,164.9 L 431.7,172.7 L 430.7,183.5 L 430.9,191.2 L 431.1,191.9 L 431.2,192.9 L 432.8,193.8 L 434.8,192.7 L 435.5,191.0 L 436.2,189.8 L 437.2,187.8 L 439.2,186.6 L 441.2,185.6 L 443.9,187.5 L 445.4,189.2 L 447.3,190.1 L 448.3,189.6 L 449.5,189.0 L 450.6,188.2 L 451.9,186.5 L 452.6,186.2 L 453.7,187.6 L 453.8,188.5 L 455.2,189.4 L 455.0,191.5 L 455.0,192.9 L 456.2,194.7 L 457.2,196.5 L 458.8,197.3 L 458.0,198.9 L 456.7,200.2 L 456.8,201.6 L 458.5,202.0 L 459.4,203.2 L 460.9,204.0 L 463.9,204.3 L 465.7,202.4 L 463.0,207.8 L 462.9,208.8 Z';

const CITIES: City[] = [
  { abbr: 'UMU', name: 'Umuarama', x: 101.5, y: 100.1 },
  { abbr: 'CIA', name: 'Cianorte', x: 151.3, y: 92.8 },
  { abbr: 'PAR', name: 'Paranavaí', x: 161.0, y: 51.2 },
  { abbr: 'CAM', name: 'Campo Mourão', x: 166.6, y: 119.7 },
  { abbr: 'MDÇ', name: 'Mandaguaçu', x: 186.5, y: 70.6 },
  { abbr: 'MAR', name: 'Maringá', x: 197.4, y: 76.0 },
  { abbr: 'PAI', name: 'Paiçandu', x: 189.8, y: 78.3 },
  { abbr: 'SAR', name: 'Sarandi', x: 201.7, y: 77.3 },
  { abbr: 'MVA', name: 'Marialva', x: 207.5, y: 80.2 },
  { abbr: 'GUA', name: 'Guaíra', x: 37.2, y: 122.5 },
  { abbr: 'TOL', name: 'Toledo', x: 72.6, y: 166.8 },
  { abbr: 'CAS', name: 'Cascavel', x: 92.5, y: 183.9 },
  { abbr: 'FOZ', name: 'Foz do Iguaçu', x: 14.2, y: 225.5 },
  { abbr: 'APU', name: 'Apucarana', x: 230.4, y: 84.9 },
  { abbr: 'ARA', name: 'Arapongas', x: 232.9, y: 75.6 },
  { abbr: 'LON', name: 'Londrina', x: 251.0, y: 67.9 },
  { abbr: 'GPR', name: 'Guarapuava', x: 230.6, y: 214.8 },
  { abbr: 'PGA', name: 'Ponta Grossa', x: 320.2, y: 193.7 },
  { abbr: 'CTB', name: 'Curitiba', x: 382.1, y: 217.2 }
];

export const ServiceArea: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-brand-400 uppercase mb-3">Área de Atendimento</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Atendimento em todo o Paraná
            </h3>
            <p className="text-slate-300 mb-8 leading-relaxed text-sm md:text-base max-w-lg">
              Base em Maringá (PR), com fabricação, instalação e manutenção de câmara fria e
              refrigeração comercial para as principais cidades do estado. Passe o mouse ou toque
              nos marcadores para ver cada cidade atendida.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
              {CITIES.map((c) => (
                <li
                  key={c.abbr}
                  className={`flex items-center gap-2 text-sm transition-colors cursor-default ${
                    active === c.abbr ? 'text-brand-400' : 'text-slate-300'
                  }`}
                  onMouseEnter={() => setActive(c.abbr)}
                  onMouseLeave={() => setActive(null)}
                >
                  <MapPin size={14} className="shrink-0 text-brand-400" />
                  <span>{c.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mapa real do Paraná com marcadores por cidade */}
          <div className="relative">
            <svg
              viewBox="0 0 480 320"
              className="w-full h-auto max-w-xl mx-auto"
              aria-label="Mapa do Paraná com as cidades atendidas pela Refrigóis"
            >
              {/* Contorno real do Paraná */}
              <path
                d={PARANA_PATH}
                className="fill-slate-800 stroke-brand-500/50"
                strokeWidth={1.5}
                strokeLinejoin="round"
              />

              {CITIES.map((c) => {
                const isActive = active === c.abbr;
                const isMaringa = c.abbr === 'MAR';
                return (
                  <g
                    key={c.abbr}
                    onMouseEnter={() => setActive(c.abbr)}
                    onMouseLeave={() => setActive(null)}
                    onTouchStart={() => setActive(c.abbr)}
                    className="cursor-pointer"
                  >
                    <title>{c.name}</title>
                    {isMaringa && (
                      <circle cx={c.x} cy={c.y} r={6} className="fill-brand-300 animate-ping" style={{ transformOrigin: `${c.x}px ${c.y}px` }} />
                    )}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={isActive ? 6 : isMaringa ? 5 : 4}
                      className={
                        isMaringa
                          ? 'fill-white stroke-brand-400'
                          : isActive
                          ? 'fill-brand-300 stroke-white'
                          : 'fill-brand-500 stroke-brand-300'
                      }
                      strokeWidth={1.5}
                    />
                    <text
                      x={c.x}
                      y={c.y - 9}
                      textAnchor="middle"
                      className="fill-white font-bold uppercase pointer-events-none select-none"
                      style={{
                        fontSize: isActive ? '12px' : '8.5px',
                        paintOrder: 'stroke',
                        stroke: 'rgba(12,74,110,0.9)',
                        strokeWidth: 3,
                      }}
                    >
                      {isActive ? c.name : c.abbr}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white border border-brand-400" /> Sede (Maringá)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-500" /> Cidade atendida
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
