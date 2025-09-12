import React from "react";

interface Step2Props {
  points: {
    tournamentChampion: number;
    teamWithMostGoals: number;
    exactScore: number;
    matchWinner: number;
  };
  setPoints: React.Dispatch<
    React.SetStateAction<{
      tournamentChampion: number;
      teamWithMostGoals: number;
      exactScore: number;
      matchWinner: number;
    }>
  >;
}

const pointLabels: { [key: string]: string } = {
  tournamentChampion: "Campeón del torneo",
  teamWithMostGoals: "Equipo con más goles",
  exactScore: "Marcador exacto",
  matchWinner: "Ganador del partido",
};

export function Step2({ points, setPoints }: Step2Props) {
  const incrementPoints = (rule: keyof typeof points) => {
    setPoints((prevPoints) => ({
      ...prevPoints,
      [rule]: prevPoints[rule] + 1,
    }));
  };

  const decrementPoints = (rule: keyof typeof points) => {
    setPoints((prevPoints) => ({
      ...prevPoints,
      [rule]: prevPoints[rule] > 0 ? prevPoints[rule] - 1 : 0,
    }));
  };

  return (
    <div className="flex flex-col w-full h-full">
        <h2 className="self-start mt-16 text-3xl font-bold leading-none text-black max-md:mt-10">
        Sistema de puntos
        </h2>
        <div className="flex flex-col flex-grow">
            {Object.keys(points).map((key) => (
                <div
                key={key}
                className="flex items-center justify-between mt-7 w-full"
                >
                    <label className="text-lg font-semibold leading-none text-black">
                    {pointLabels[key]}
                    </label>
                    <div className="flex items-center">
                        <button
                        onClick={() => decrementPoints(key as keyof typeof points)}
                        className="w-8 h-8 bg-white border border-black text-black rounded-full"
                        >
                        -
                        </button>
                        <span className="px-4 py-1 bg-white text-black">
                        {points[key as keyof typeof points]}
                        </span>
                        <button
                        onClick={() => incrementPoints(key as keyof typeof points)}
                        className="w-8 h-8 bg-white border border-black text-black rounded-full"
                        >
                        +
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
