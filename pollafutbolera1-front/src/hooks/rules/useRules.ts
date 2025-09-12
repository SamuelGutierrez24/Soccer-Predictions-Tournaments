import { useState, useEffect } from 'react';
import { Rule } from '@/src/interfaces/rule';
import { RulesService } from '@/src/apis/rules.api'; 
import { useCurrentUser } from '@/src/hooks/auth/userCurrentUser';

export const useRules = (tournamentId: string) => {
  const [rules, setRules] = useState<Rule | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useCurrentUser();
  const userLoading = false;
  
  useEffect(() => {
    if (userLoading) {
      console.log("User data is still loading...");
      return;
    }
    const fetchRules = async () => {  
      if (currentUser?.accessToken) {
        setLoading(true);   
        const rulesService = new RulesService(process.env.NEXT_PUBLIC_API_BASE_URL || '');
        try {
            const rules = await rulesService.getRules(currentUser.accessToken, tournamentId);
            setRules(rules);
        } catch (error) {
            console.error("Error fetching rules:", error);
        } finally {
            setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchRules();
  }, [tournamentId, currentUser, userLoading]);

  return { rules, loading };
}