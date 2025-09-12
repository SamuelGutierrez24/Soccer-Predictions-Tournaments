import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Group } from "@/src/interfaces/polla";
import TeamList from "../teams/TeamList";
import MatchList from "../matches/MatchList";

interface GroupCardProps {
  group: Group;
}

const GroupCard = ({ group }: GroupCardProps) => {
  const sortedTeams = group.teams.slice().sort((a, b) => a.rank - b.rank);

  const mappedMatches = group.matches.map((match) => {
    const home = sortedTeams.find((t) => String(t.teamId) === String(match.homeTeamId));
    const away = sortedTeams.find((t) => String(t.teamId) === String(match.awayTeamId));

    return {
      ...match,
      homeTeam: home ?? {
        id: String(match.homeTeamId),
        teamName: "Unknown",
        teamLogoUrl: "",
        points: 0,
        rank: 0,
      },
      awayTeam: away ?? {
        id: String(match.awayTeamId),
        teamName: "Unknown",
        teamLogoUrl: "",
        points: 0,
        rank: 0,
      },
    };
  });

  return (
    <Tabs defaultValue="standings">
      <div className="border border-[#313EB1] rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="bg-[#313EB1] p-6 text-center">
          <h3 className="text-white text-2xl font-bold mb-2">{group.groupName}</h3>

          <TabsList className="flex justify-center space-x-30 bg-transparent border-none">
            <TabsTrigger
              value="standings"
              className="
                text-white
                font-normal
                data-[state=active]:font-bold
                focus:outline-none
                transition
              "
            >
              Standings
            </TabsTrigger>

            <TabsTrigger
              value="matches"
              className="
                text-white
                font-normal
                data-[state=active]:font-bold
                focus:outline-none
                transition
              "
            >
              Matches
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="standings">
          <div className="p-4">
            <TeamList teams={sortedTeams} advancingCount={2} />
          </div>
        </TabsContent>

        <TabsContent value="matches">
          <div className="p-4">
            <MatchList matches={mappedMatches} teams={sortedTeams} />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default GroupCard;
