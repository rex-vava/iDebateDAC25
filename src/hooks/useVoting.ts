import { useState, useEffect } from 'react';
import { supabase, getVoterId } from '../lib/supabase';

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

      // Fetch all votes with nominee information
      const { data: votesData, error: votesError } = await supabase
        .from('votes')
        .select(`
          *,
          nominees (
            id,
            name
          )
        `);

      if (votesError) throw votesError;

      // Process vote statistics
      const stats: VoteStats = {};
      const userVotesData: UserVotes = {};

      votesData?.forEach(vote => {
        const { category_id, nominee_id, voter_id, nominees } = vote;
        const nomineeName = nominees?.name || 'Unknown';

        // Build vote statistics
        if (!stats[category_id]) {
          stats[category_id] = {};
        }
        if (!stats[category_id][nominee_id]) {
          stats[category_id][nominee_id] = {
            count: 0,
            nomineeName
          };
        }
        stats[category_id][nominee_id].count++;

        // Track current user's votes
        if (voter_id === voterId) {
          userVotesData[category_id] = {
            nomineeId: nominee_id,
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

    // Set up real-time subscription for votes
    const votesSubscription = supabase
      .channel('votes-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'votes' },
        () => fetchVoteData()
      )
      .subscribe();

    return () => {
      votesSubscription.unsubscribe();
    };
  }, [voterId]);

  const vote = async (categoryId: string, nomineeId: string, nomineeName: string) => {
    try {
      // Check if user already voted in this category
      const existingVote = userVotes[categoryId];
      
      if (existingVote) {
        // Update existing vote
        const { error } = await supabase
          .from('votes')
          .update({ nominee_id: nomineeId })
          .eq('category_id', categoryId)
          .eq('voter_id', voterId);

        if (error) throw error;
      } else {
        // Insert new vote
        const { error } = await supabase
          .from('votes')
          .insert({
            category_id: categoryId,
            nominee_id: nomineeId,
            voter_id: voterId
          });

        if (error) throw error;
      }

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