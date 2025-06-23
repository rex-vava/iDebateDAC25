import React, { useState } from 'react';
import { X, Users, BarChart3, Upload, Plus, Trash2, Edit, LogOut, Shield, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { categories } from '../data/categories';
import VoteStatsPanel from './VoteStatsPanel';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
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
            <VoteStatsPanel showExport={true} />
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