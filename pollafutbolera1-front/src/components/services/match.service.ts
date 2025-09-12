import axios from 'axios';
import { Match } from 'date-fns';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const matchService = {
  getMatchesByTournament: async (tournamentId: string): Promise<Match[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/matches/tournament/${tournamentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  },

  getMatchesByStageAndTournament: async (stageId: string, tournamentId: string): Promise<Match[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/matches/stage/${stageId}/tournament/${tournamentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching matches for stage:', error);
      throw error;
    }
  }
};