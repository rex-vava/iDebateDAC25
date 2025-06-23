import React, { useState } from 'react';
import { X, Users, BarChart3, Download, Upload, Plus, Trash2, Edit, LogOut, Shield, Clock } from 'lucide-react';
import { useVoting } from '../hooks/useVoting';
import { useAuth } from '../hooks/useAuth';
import { categories } from '../data/categories';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { voteStats, getTotalCategoryVotes } = useVoting();
  const { logout, extendSession } = useAuth();
  const [activeTab, setActiveTab] = useState<'stats' | 'manage'>('stats');

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleExtendSession = () => {
    extendSession();
    alert('Session extended for another 24 hours');
  };

  const exportData = () => {
    const data = {
      categories,
      voteStats,
      exportDate: new Date().toISOString(),
      totalVotes: Object.values(voteStats).reduce((total, categoryStats) => {
        return total + Object.values(categoryStats).reduce((sum, count) => sum + count, 0);
      }, 0)
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dreamers-voting-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTopNominee = (categoryId: string) => {
    const categoryStats = voteStats[categoryId];
    if (!categoryStats) return null;
    
    let topNominee = '';
    let maxVotes = 0;
    
    Object.entries(categoryStats).forEach(([nominee, votes]) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        topNominee = nominee;
      }
    });
    
    return maxVotes > 0 ? { nominee: topNominee, votes: maxVotes } : null;
  };

  const getTotalSystemVotes = () => {
    return Object.values(voteStats).reduce((total, categoryStats) => {
      return total + Object.values(categoryStats).reduce((sum, count) => sum + count, 0);
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Admin Panel</h3>
                <p className="text-sm text-gray-600">Dreamers Academy Gala Voting System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExtendSession}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                title="Extend session by 24 hours"
              >
                <Clock className="w-4 h-4" />
                Extend Session
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">{categories.length}</div>
              <div className="text-sm text-blue-700">Total Categories</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-900">{getTotalSystemVotes()}</div>
              <div className="text-sm text-green-700">Total Votes Cast</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-900">
                {categories.filter(cat => !cat.isAward).length}
              </div>
              <div className="text-sm text-purple-700">Voting Categories</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-900">
                {categories.filter(cat => cat.isAward).length}
              </div>
              <div className="text-sm text-orange-700">Special Awards</div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'stats'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Vote Statistics
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'manage'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Manage Nominees
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'stats' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-semibold">Voting Statistics</h4>
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
              </div>

              <div className="grid gap-6">
                {categories.map((category) => {
                  if (category.isAward) {
                    return (
                      <div key={category.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border-l-4 border-yellow-400">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{category.icon}</div>
                          <div>
                            <h5 className="text-lg font-semibold text-gray-900">
                              {category.title}
                            </h5>
                            <p className="text-sm text-gray-600">{category.description}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full font-medium">
                              Special Award - No Voting Required
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const totalVotes = getTotalCategoryVotes(category.id);
                  const topNominee = getTopNominee(category.id);
                  
                  return (
                    <div key={category.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h5 className="text-lg font-semibold text-gray-900">
                            {category.icon} {category.title}
                          </h5>
                          <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                          <p className="text-sm font-medium text-gray-700">Total votes: {totalVotes}</p>
                        </div>
                        {topNominee && (
                          <div className="text-right bg-white p-3 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-600">Leading:</p>
                            <p className="font-medium text-orange-600">{topNominee.nominee}</p>
                            <p className="text-sm text-gray-500">{topNominee.votes} votes</p>
                          </div>
                        )}
                      </div>
                      
                      {totalVotes > 0 && category.nominees.length > 0 && (
                        <div className="space-y-3">
                          {category.nominees.map((nominee) => {
                            const votes = voteStats[category.id]?.[nominee] || 0;
                            const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                            
                            return (
                              <div key={nominee} className="bg-white p-3 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-700">{nominee}</span>
                                  <span className="text-sm text-gray-500">
                                    {votes} vote{votes !== 1 ? 's' : ''} ({percentage.toFixed(1)}%)
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="h-2 rounded-full transition-all duration-500"
                                    style={{ 
                                      width: `${percentage}%`,
                                      background: 'linear-gradient(to right, #eb754f, #f4be68)'
                                    }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {totalVotes === 0 && (
                        <div className="text-center py-4 text-gray-500">
                          No votes cast yet for this category
                        </div>
                      )}

                      {category.nominees.length === 0 && (
                        <div className="text-center py-4 text-gray-500 bg-yellow-50 rounded-lg">
                          No nominees added yet - awaiting nominations
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-semibold">Manage Categories & Nominees</h4>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Upload className="w-4 h-4" />
                    Import Data
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Category
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className={`rounded-lg p-6 ${
                    category.isAward 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400' 
                      : 'bg-gray-50'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h5 className="text-lg font-semibold text-gray-900">
                          {category.icon} {category.title}
                        </h5>
                        <p className="text-sm text-gray-600">{category.description}</p>
                        {category.isAward && (
                          <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Special Award
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {!category.isAward && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h6 className="font-medium text-gray-700">
                            Nominees ({category.nominees.length})
                            {category.nominees.length === 0 && (
                              <span className="text-yellow-600 text-sm ml-2">(Awaiting nominations)</span>
                            )}
                          </h6>
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            + Add Nominee
                          </button>
                        </div>
                        {category.nominees.length > 0 ? (
                          <div className="grid gap-2">
                            {category.nominees.map((nominee, index) => (
                              <div key={index} className="flex justify-between items-center bg-white p-3 rounded border">
                                <span className="text-sm">{nominee}</span>
                                <button className="text-red-600 hover:text-red-800">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                            <p className="text-yellow-700 text-sm">
                              No nominees added yet. This category is awaiting nominations.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;