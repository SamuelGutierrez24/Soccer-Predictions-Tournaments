import { getAllTournaments} from '../../src/hooks/tournament/useTournament';
import { TournamentService } from '../../src/components/services/tournament.service';

jest.mock('../../src/components/services/tournament.service');

describe('useTournament', () => {
    it('should fetch all tournaments', async () => {
        const mockTournaments = [
            {
                id: 1,
                name: 'Copa América 2024',
                description: 'Tournament description',
                initial_date: '2024-06-01',
                final_date: '2024-07-15',
                winner_team_id: null,
                fewest_goals_conceded_team_id: null,
                top_scoring_team_id: null,
                deleted_at: null
            }
        ];
        
        TournamentService.prototype.getAllTournaments = jest.fn().mockResolvedValue(mockTournaments);

        const result = await getAllTournaments();

        expect(TournamentService.prototype.getAllTournaments).toHaveBeenCalled();
        expect(result).toEqual(mockTournaments);
    });

    it('should handle error when fetching tournaments', async () => {
        const mockError = new Error('Failed to fetch tournaments');
        
        TournamentService.prototype.getAllTournaments = jest.fn().mockRejectedValue(mockError);

        await expect(getAllTournaments()).rejects.toThrow(mockError);
        expect(TournamentService.prototype.getAllTournaments).toHaveBeenCalled();
    });

});
