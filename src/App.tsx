import React, { useState } from 'react';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import VotingModal from './components/VotingModal';
import CountdownTimer from './components/CountdownTimer';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import VoteStatsPanel from './components/VoteStatsPanel';
import { categories } from './data/categories';
import { useVoting } from './hooks/useVoting';
import { useAuth } from './hooks/useAuth';
import { Trophy, Users, Award, Settings, BarChart3 } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { vote, hasVoted, getUserVote, getTotalVotes } = useVoting();
  const { isAuthenticated, isLoading } = useAuth();

  const handleVote = (categoryId: string, nominee: string) => {
    vote(categoryId, nominee);
  };

  const handleAdminClick = () => {
    if (isAuthenticated) {
      setShowAdmin(true);
    } else {
      setShowLogin(true);
    }
  };

  const selectedCategoryData = selectedCategory 
    ? categories.find(cat => cat.id === selectedCategory)
    : null;

  const votableCategories = categories.filter(cat => !cat.isAward);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />
      
      {/* Admin & Stats Toggle */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        <button
          onClick={() => setShowStats(!showStats)}
          className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          title="Vote Statistics"
        >
          <BarChart3 className="w-5 h-5 text-blue-600" />
        </button>
        <button
          onClick={handleAdminClick}
          className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          title={isAuthenticated ? "Admin Panel" : "Admin Login"}
        >
          <Settings className={`w-5 h-5 ${isAuthenticated ? 'text-green-600' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* Vote Statistics Modal */}
      {showStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Vote Statistics</h3>
                    <p className="text-sm text-gray-600">Real-time voting analytics and results</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowStats(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Settings className="w-6 h-6 rotate-45" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <VoteStatsPanel showExport={false} />
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showLogin && (
        <AdminLogin onClose={() => setShowLogin(false)} />
      )}

      {/* Admin Panel */}
      {showAdmin && isAuthenticated && (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      )}
      
      {/* Welcome Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Welcome to the Official Voting Platform
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            This special night is not only a reunion and a celebration — it's your chance to honor the legends, leaders, and unforgettable moments of the past decade. As we prepare to expand the Dream to Uganda or Juba in 2026, your vote helps recognize those who made this journey possible.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3" style={{ color: '#f4be68' }} />
            <div className="text-3xl font-bold text-gray-900 mb-1">{categories.length}</div>
            <div className="text-gray-600">Award Categories</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Users className="w-12 h-12 mx-auto mb-3" style={{ color: '#eb754f' }} />
            <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
            <div className="text-gray-600">Total Nominees</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Award className="w-12 h-12 mx-auto mb-3" style={{ color: '#a16333' }} />
            <div className="text-3xl font-bold text-gray-900 mb-1">{getTotalVotes()}</div>
            <div className="text-gray-600">Your Votes Cast</div>
          </div>
        </div>

        <CountdownTimer />
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🏆 Award Categories
          </h2>
          <p className="text-lg text-gray-700">
            Click on each category to view nominees and submit your vote. Each participant can vote once per category.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => setSelectedCategory(category.id)}
              hasVoted={hasVoted(category.id)}
            />
          ))}
        </div>
      </section>

      {/* Voting Progress */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-xl p-8 text-white text-center" style={{
          background: 'linear-gradient(to right, #eb754f, #a16333)'
        }}>
          <h3 className="text-2xl font-bold mb-4">Your Voting Progress</h3>
          <div className="mb-4">
            <div className="text-4xl font-bold mb-2">
              {getTotalVotes()} / {votableCategories.length}
            </div>
            <div className="text-lg opacity-90">Categories Completed</div>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-4">
            <div 
              className="h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${(getTotalVotes() / votableCategories.length) * 100}%`,
                backgroundColor: '#f4be68'
              }}
            ></div>
          </div>
          <p className="text-sm opacity-90">
            {getTotalVotes() === votableCategories.length 
              ? "🎉 Congratulations! You've voted in all categories!"
              : `${votableCategories.length - getTotalVotes()} categories remaining`
            }
          </p>
        </div>
      </section>

      <Footer />

      {/* Voting Modal */}
      {selectedCategoryData && (
        <VotingModal
          category={selectedCategoryData}
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onVote={handleVote}
          hasVoted={hasVoted(selectedCategory!)}
          userVote={getUserVote(selectedCategory!)}
        />
      )}
    </div>
  );
}

export default App;