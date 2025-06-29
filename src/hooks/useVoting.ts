import { useState, useEffect } from 'react';
import { 
  Vote, 
  getVoterId, 
  getFromStorage, 
  setToStorage, 
  STORAGE_KEYS 
} from '../data/localData';

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

  const fetchVoteData = async () => {
    try {
      setLoading(true);

      // Get votes and nominees from local storage
      const votes: Vote[] = getFromStorage(STORAGE_KEYS.VOTES, []);
      const nominees = getFromStorage(STORAGE_KEYS.NOMINEES, []);

      // Process vote statistics
      const stats: VoteStats = {};
      const userVotesData: UserVotes = {};

      votes.forEach(vote => {
        const { categoryId, nomineeId, voterId: voteVoterId } = vote;
        const nominee = nominees.find((n: any) => n.id === nomineeId);
        const nomineeName = nominee?.name || 'Unknown';

        // Build vote statistics
        if (!stats[categoryId]) {
          stats[categoryId] = {};
        }
        if (!stats[categoryId][nomineeId]) {
          stats[categoryId][nomineeId] = {
            count: 0,
            nomineeName
          };
        }
        stats[categoryId][nomineeId].count++;

        // Track current user's votes
        if (voteVoterId === voterId) {
          userVotesData[categoryId] = {
            nomineeId,
            nomineeName
          };
        }
      });

      setVoteStats(stats);
      setUserVotes(userVotesData);
      setError(null);
    } catch (err) {
      console.error('Error fetching vote data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch vote data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoteData();
  }, [voterId]);

  const vote = async (categoryId: string, nomineeId: string, nomineeName: string) => {
    try {
      const votes: Vote[] = getFromStorage(STORAGE_KEYS.VOTES, []);
      
      // Check if user already voted in this category
      const existingVoteIndex = votes.findIndex(
        vote => vote.categoryId === categoryId && vote.voterId === voterId
      );
      
      if (existingVoteIndex >= 0) {
        // Update existing vote
        votes[existingVoteIndex] = {
          ...votes[existingVoteIndex],
          nomineeId,
          createdAt: new Date().toISOString()
        };
      } else {
        // Add new vote
        const newVote: Vote = {
          id: `vote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          categoryId,
          nomineeId,
          voterId,
          createdAt: new Date().toISOString()
        };
        votes.push(newVote);
      }

      setToStorage(STORAGE_KEYS.VOTES, votes);
      
      // Refresh vote data
      await fetchVoteData();
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
    refetch: fetchVoteData
  };
};