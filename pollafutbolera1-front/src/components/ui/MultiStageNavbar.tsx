'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

type L1 = 'partidos' | 'ranking' | 'estadisticas' | 'equipos' | 'SubPollas' | 'rewards';
type L2 = 'todo' | 'porJugar' | 'jugados' | 'misPredicciones' | 'fases';
type L3 = 'bracket' | 'grupos' | 'octavos' | 'cuartos' | 'final';

export interface NavbarSelection {
  level1: L1;
  level2?: L2;
  level3?: L3;
}

interface Props {
  onChange(sel: NavbarSelection): void;
}


function ScrollableNav({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const checkScroll = () => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [children]);

  return (
    <div className="relative">
      {canLeft && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-gray-100 to-transparent z-10" />
      )}
      {canRight && (
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-gray-100 to-transparent z-10" />
      )}
      <div
        ref={ref}
        onScroll={checkScroll}
        className="scroll-x md:overflow-x-visible snap-x"
      >
        {children}
      </div>
    </div>
  );
}


const btnBase = [
  'flex-shrink-0',
  'px-4 py-2',
  'relative',
  'text-sm font-medium',
  'transition-colors duration-200',
  'whitespace-nowrap',
].join(' ');

const btnInactive = 'text-gray-500 hover:text-gray-700';
const btnActive   = 'text-gray-900';
const activeUnderline = `
  after:content-['']
  after:absolute
  after:bottom-0
  after:left-0
  after:w-full
  after:h-0.5
  after:bg-gray-800
  after:rounded
  after:transition-all
`;

export default function MultiStageNavbar({ onChange }: Props) {
  const [l1, setL1] = useState<L1>('partidos');
  const [l2, setL2] = useState<L2>('todo');
  const [l3, setL3] = useState<L3 | undefined>();

  const pick1 = (v: L1) => {
    setL1(v);
    if (v !== 'partidos') {
      setL2(undefined as any);
      setL3(undefined);
      onChange({ level1: v });
    } else {
      setL2('todo');
      setL3(undefined);
      onChange({ level1: v, level2: 'todo' });
    }
  };
  const pick2 = (v: L2) => {
    setL2(v);
    if (v !== 'fases') {
      setL3(undefined);
      onChange({ level1: l1, level2: v });
    } else {
      setL3('bracket');
      onChange({ level1: l1, level2: v, level3: 'bracket' });
    }
  };
  const pick3 = (v: L3) => {
    setL3(v);
    onChange({ level1: l1, level2: l2, level3: v });
  };

  type Item = { key: string; label: string; onClick: () => void; active: boolean };

  const renderLevel = (items: Item[]) => (
    <ScrollableNav>
      <div className="flex flex-nowrap gap-4 sm:gap-6 md:gap-8 snap-center md:justify-center">
        {items.map(({ key, label, onClick, active }) => (
          <button
            key={key}
            onClick={onClick}
            className={[
              btnBase,
              active ? `${btnActive} ${activeUnderline}` : btnInactive
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>
    </ScrollableNav>
  );

  return (
    <nav className="w-full space-y-4 px-4 md:px-8 lg:px-16">
      
      {renderLevel([
        { key: 'p',  label: 'Partidos',     onClick: () => pick1('partidos'),     active: l1 === 'partidos' },
        { key: 'r',  label: 'Ranking',      onClick: () => pick1('ranking'),      active: l1 === 'ranking' },
        { key: 'e',  label: 'Estadísticas', onClick: () => pick1('estadisticas'), active: l1 === 'estadisticas' },
        { key: 'q',  label: 'Equipos',      onClick: () => pick1('equipos'),      active: l1 === 'equipos' },
        { key: 're', label: 'Premios',      onClick: () => pick1('rewards'),      active: l1 === 'rewards' },
      ])}
      <hr className="border-t border-gray-300 mx-auto w-full" />

      
      {l1 === 'partidos' && (
        <>
          {renderLevel([
            { key: 'todo', label: 'Todo',             onClick: () => pick2('todo'),            active: l2 === 'todo' },
            { key: 'pj',   label: 'Por jugar',        onClick: () => pick2('porJugar'),        active: l2 === 'porJugar' },
            { key: 'jug',  label: 'Jugados',          onClick: () => pick2('jugados'),         active: l2 === 'jugados' },
            { key: 'pred', label: 'Mis Predicciones', onClick: () => pick2('misPredicciones'), active: l2 === 'misPredicciones' },
            { key: 'fas',  label: 'Fases',            onClick: () => pick2('fases'),           active: l2 === 'fases' },
          ])}
          <hr className="border-t border-gray-300 mx-auto w-full" />
        </>
      )}

      
      {l1 === 'partidos' && l2 === 'fases' && renderLevel([
        { key: 'br', label: 'Bracket', onClick: () => pick3('bracket'), active: l3 === 'bracket' },
        { key: 'gr', label: 'Grupos',  onClick: () => pick3('grupos'),  active: l3 === 'grupos' },
        { key: 'oc', label: 'Octavos', onClick: () => pick3('octavos'), active: l3 === 'octavos' },
        { key: 'cu', label: 'Cuartos', onClick: () => pick3('cuartos'), active: l3 === 'cuartos' },
        { key: 'fi', label: 'Final',   onClick: () => pick3('final'),   active: l3 === 'final' },
      ])}
    </nav>
  );
}
