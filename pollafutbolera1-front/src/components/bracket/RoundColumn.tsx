
"use client";
import React, { JSX } from 'react';
import MatchCard from './MatchCard';
import { Team } from '@/src/interfaces/polla';
import { MatchOrPlaceholder } from './mockMatches';

interface Props {
  title: string;
  matches: MatchOrPlaceholder[];
  teams: Team[];
  depth: number;
  isLast?: boolean;
  onMatchClick?: (m: MatchOrPlaceholder) => void;
}

const CARD_H = 84;
const GAP_0 = 30;
const COL_GAP = 96;
const COLOR = '#9DA4B7';
const SLOT = CARD_H + GAP_0;
const ARM = COL_GAP / 2;
const pow2 = (n: number) => 1 << n;

const calculateMatchPositions = (
  matches: MatchOrPlaceholder[],
  depth: number
) => {
  const positions: { match: MatchOrPlaceholder; top: number; pairIndex: number }[] = [];
  const validMatches = matches.filter(
    m =>
      m &&
      (('id' in m && m.id) ||
        m.homeTeamId ||
        m.awayTeamId ||
        ('isPlaceholder' in m && m.isPlaceholder))
  );

  if (depth === 0) {
    validMatches.forEach((match, matchIndex) => {
      const top = matchIndex * SLOT;
      const pairIndex = Math.floor(matchIndex / 2);
      positions.push({ match, top, pairIndex });
    });
  } else {
    const spacingMultiplier = pow2(depth);
    validMatches.forEach((match, matchIndex) => {
      const startPositionInPreviousRound = matchIndex * spacingMultiplier;
      const endPositionInPreviousRound =
        startPositionInPreviousRound + spacingMultiplier - 1;
      const startTop = startPositionInPreviousRound * SLOT;
      const endTop = endPositionInPreviousRound * SLOT;
      const centerTop = (startTop + endTop) / 2;
      positions.push({
        match,
        top: centerTop,
        pairIndex: matchIndex,
      });
    });
  }
  return positions;
};

const renderConnectors = (
  matchPositions: { match: MatchOrPlaceholder; top: number; pairIndex: number }[],
  depth: number
) => {
  const connectors: JSX.Element[] = [];

  for (let i = 0; i < matchPositions.length - 1; i += 2) {
    const pos1 = matchPositions[i];
    const pos2 = matchPositions[i + 1];
    if (pos1 && pos2) {
      const startY = pos1.top + CARD_H / 2;
      const endY = pos2.top + CARD_H / 2;
      const centerY = (startY + endY) / 2;
      const minY = Math.min(startY, endY);
      const maxY = Math.max(startY, endY);

      
      connectors.push(
        <div
          key={`h1-${depth}-${i}`}
          className="absolute"
          style={{
            top: startY,
            left: 200,
            width: ARM,
            height: 2,
            backgroundColor: COLOR,
            zIndex: 5,
          }}
        />
      );

      
      connectors.push(
        <div
          key={`h2-${depth}-${i}`}
          className="absolute"
          style={{
            top: endY,
            left: 200,
            width: ARM,
            height: 2,
            backgroundColor: COLOR,
            zIndex: 5,
          }}
        />
      );

      
      connectors.push(
        <div
          key={`v-${depth}-${i}`}
          className="absolute"
          style={{
            top: minY,
            left: 200 + ARM,
            width: 2,
            height: maxY - minY,
            backgroundColor: COLOR,
            zIndex: 5,
          }}
        />
      );

      
      connectors.push(
        <div
          key={`center-${depth}-${i}`}
          className="absolute"
          style={{
            top: centerY,
            left: 200 + ARM,
            width: ARM,
            height: 2,
            backgroundColor: COLOR,
            zIndex: 5,
          }}
        />
      );
    }
  }

  
  if (matchPositions.length % 2 === 1) {
    const lastPos = matchPositions[matchPositions.length - 1];
    connectors.push(
      <div
        key={`single-${depth}`}
        className="absolute"
        style={{
          top: lastPos.top + CARD_H / 2,
          left: 200,
          width: COL_GAP,
          height: 2,
          backgroundColor: COLOR,
          zIndex: 5,
        }}
      />
    );
  }

  return connectors;
};

function mapRoundTitle(title: string): string {
  switch (title) {
    case "ROUND OF 16":
      return "OCTAVOS";
    case "QUARTER-FINALS":
      return "CUARTOS";
    case "SEMI-FINALS":
      return "SEMI FINAL";
    default:
      return title;
  }
}

export default function RoundColumn({
  title,
  matches,
  teams,
  depth,
  isLast = false,
  onMatchClick,
}: Props) {
  const matchPositions = calculateMatchPositions(matches, depth);

  const calculateTotalHeight = () => {
    if (matchPositions.length === 0) return 400;
    const maxTop = Math.max(...matchPositions.map(p => p.top));
    const baseHeight = maxTop + CARD_H + 50;
    if (depth === 0) {
      return Math.max(baseHeight, matches.length * SLOT + 100);
    }
    const minHeight = Math.max(400, baseHeight);
    return minHeight;
  };

  const totalHeight = calculateTotalHeight();
  const connectors = !isLast ? renderConnectors(matchPositions, depth) : [];

  return (
    <div
      className="relative"
      style={{
        marginRight: isLast ? 0 : COL_GAP,
        minHeight: totalHeight,
        width: 200,
      }}
    >
      <h3 className="mb-50 text-xs font-semibold text-[#6D7281] text-center tracking-wide uppercase">
        {mapRoundTitle(title)}
      </h3>
      <div className="relative" style={{ minHeight: totalHeight - 100 }}>
        {matchPositions.map(({ match, top }, index) => {
          const matchKey =
            'isPlaceholder' in match
              ? match.id
              : `match-${(match as any).id || `${depth}-${index}`}`;
          return (
            <div
              key={matchKey}
              className="absolute w-full transition-all duration-300"
              style={{ top, zIndex: 10 }}
            >
              <MatchCard match={match} teams={teams} onClick={onMatchClick} />
            </div>
          );
        })}
        {connectors}
        {matchPositions.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
            No hay partidos para mostrar
          </div>
        )}
      </div>
    </div>
  );
}
