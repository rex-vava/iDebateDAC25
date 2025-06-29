import { useState, useEffect } from 'react';
import { database, getVoterId, Vote } from '../lib/firebase';
import { ref, onValue, off, set, push, update } from 'firebase/database';

interface VoteStats {
  [categoryId: string]: {
    [nomineeId: string]: {
      count: number;
      nomineeName: string;
    };
  };
}

interface UserVotes {
  [categoryId: string]: {
    nomineeId: string;
    nomineeName: string;
  };
}

export const useVoting = () => {
  const [voteStats, setVoteStats] = useState<VoteStats>({});
  const [userVotes, setUserVotes] = useState<UserVotes>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const voterId = getVoterId();

  useEffect(() => {
    const votesRef = ref(database, 'votes');
    
    const unsubscribe = onValue(votesRef, (snapshot) => {
      try {
        const votesData = snapshot.exists() ? snapshot.val() : {};
        
        // Process vote statistics
        const stats: VoteStats = {};
        const userVotesData: UserVotes = {};

        Object.values(votesData as { [key: string]: Vote }).forEach((vote) => {
          const { category_id, nominee_id, voter_id, nominee_name } = vote;

          // Build vote statistics
          if (!stats[category_id]) {
            stats[category_id] = {};
          }
          if (!stats[category_id][nominee_id]) {
            stats[category_id][nominee_id] = {
              count: 0,
              nomineeName: nominee_name
            };
          }
          stats[category_id][nominee_id].count++;

          // Track current user's votes
          if (voter_id === voterId) {
            userVotesData[category_id] = {
              nomineeId: nominee_id,
              nomineeName: nominee_name
            };
          }
        });

        setVoteStats(stats);
        setUserVotes(userVotesData);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error('Error processing vote data:', err);
        setError(err instanceof Error ? err.message : 'Failed to process vote data');
        setLoading(false);
      }
    });

    return () => {
      off(votesRef);
    };
  }, [voterId]);

  const vote = async (categoryId: string, nomineeId: string, nomineeName: string) => {
    try {
      const votesRef = ref(database, 'votes');
      
      // Check if user already voted in this category
      const existingVote = userVotes[categoryId];
      
      if (existingVote) {
        // Find and update existing vote
        const snapshot = await new Promise<any>((resolve) => {
          onValue(votesRef, resolve, { onlyOnce: true });
        });
        
        if (snapshot.exists()) {
          const votesData = snapshot.val();
          const existingVoteKey = Object.keys(votesData).find(key => 
            votesData[key].category_id === categoryId && 
            votesData[key].voter_id === voterId
          );
          
          if (existingVoteKey) {
            const voteRef = ref(database, `votes/${existingVoteKey}`);
            await update(voteRef, {
              nominee_id: nomineeId,
              nominee_name: nomineeName,
              updated_at: new Date().toISOString()
            });
          }
        }
      } else {
        // Insert new vote
        const newVoteRef = push(votesRef);
        await set(newVoteRef, {
          id: newVoteRef.key,
          category_id: categoryId,
          nominee_id: nomineeId,
          nominee_name: nomineeName,
          voter_id: voterId,
          created_at: new Date().toISOString()
        });
      }

      return true;
    } catch (err) {
      console.error('Error voting:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit vote');
      return false;
    }
  };

  const hasVoted = (categoryId: string) => {
    return categoryId in userVotes;
  };

  const getUserVote = (categoryId: string) => {
    return userVotes[categoryId]?.nomineeName;
  };

  const getTotalVotes = () => {
    return Object.keys(userVotes).length;
  };

  const getVoteCount = (categoryId: string, nomineeId: string) => {
    return voteStats[categoryId]?.[nomineeId]?.count || 0;
  };

  const getTotalCategoryVotes = (categoryId: string) => {
    if (!voteStats[categoryId]) return 0;
    return Object.values(voteStats[categoryId]).reduce((sum, nominee) => sum + nominee.count, 0);
  };

  return {
    vote,
    hasVoted,
    getUserVote,
    getTotalVotes,
    getVoteCount,
    getTotalCategoryVotes,
    voteStats,
    userVotes,
    loading,
    error,
    refetch: () => {} // Not needed with real-time updates
  };
};