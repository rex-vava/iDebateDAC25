import React, { useState } from 'react';
import { X, Users, BarChart3, Download, Upload, Plus, Trash2, Edit } from 'lucide-react';
import { useVoting } from '../hooks/useVoting';
import { categories } from '../data/categories';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { voteStats, getTotalCategoryVotes } = useVoting();
  const [activeTab, setActiveTab] = useState<'stats' | 'manage'>('stats');

  const exportData = () => {
    const data = {
      categories,
      voteStats,
      exportDate: new Date().toISOString()
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">Admin Panel</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex gap-4 mt-4">
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
                {categories.filter(cat => !cat.isAward).map((category) => {
                  const totalVotes = getTotalCategoryVotes(category.id);
                  const topNominee = getTopNominee(category.id);
                  
                  return (
                    <div key={category.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h5 className="text-lg font-semibold text-gray-900">
                            {category.icon} {category.title}
                          </h5>
                          <p className="text-sm text-gray-600">Total votes: {totalVotes}</p>
                        </div>
                        {topNominee && (
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Leading:</p>
                            <p className="font-medium text-orange-600">{topNominee.nominee}</p>
                            <p className="text-sm text-gray-500">{topNominee.votes} votes</p>
                          </div>
                        )}
                      </div>
                      
                      {totalVotes > 0 && (
                        <div className="space-y-3">
                          {category.nominees.map((nominee) => {
                            const votes = voteStats[category.id]?.[nominee] || 0;
                            const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                            
                            return (
                              <div key={nominee} className="flex items-center gap-3">
                                <div className="flex-grow">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-700">{nominee}</span>
                                    <span className="text-sm text-gray-500">{votes} votes ({percentage.toFixed(1)}%)</span>
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
                              </div>
                            );
                          })}
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
                <h4 className="text-xl font-semibold">Manage Nominees</h4>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Upload className="w-4 h-4" />
                    Import
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Category
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gray-50 rounded-lg p-6">
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
                          <h6 className="font-medium text-gray-700">Nominees ({category.nominees.length})</h6>
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            + Add Nominee
                          </button>
                        </div>
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