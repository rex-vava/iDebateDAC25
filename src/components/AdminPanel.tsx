import React, { useState } from 'react';
import { X, Users, BarChart3, Plus, Trash2, Edit, LogOut, Shield, Clock, Save, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { categories } from '../data/categories';
import VoteStatsPanel from './VoteStatsPanel';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { logout, extendSession } = useAuth();
  const [activeTab, setActiveTab] = useState<'stats' | 'manage'>('stats');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newNominee, setNewNominee] = useState('');
  const [showAddNominee, setShowAddNominee] = useState<string | null>(null);
  const [localCategories, setLocalCategories] = useState(categories);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const handleExtendSession = () => {
    extendSession();
    alert('Session extended for another 24 hours');
  };

  const addNominee = (categoryId: string) => {
    if (!newNominee.trim()) return;
    
    setLocalCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, nominees: [...cat.nominees, newNominee.trim()] }
        : cat
    ));
    
    setNewNominee('');
    setShowAddNominee(null);
    
    // In a real app, this would sync with backend
    alert('Nominee added successfully!');
  };

  const removeNominee = (categoryId: string, nomineeIndex: number) => {
    if (confirm('Are you sure you want to remove this nominee?')) {
      setLocalCategories(prev => prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, nominees: cat.nominees.filter((_, index) => index !== nomineeIndex) }
          : cat
      ));
      
      alert('Nominee removed successfully!');
    }
  };

  const saveChanges = () => {
    // In a real app, this would sync with backend
    alert('Changes saved successfully! Note: In production, this would sync with the backend database.');
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
                  <button 
                    onClick={saveChanges}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">Development Note</h5>
                    <p className="text-blue-700 text-sm mt-1">
                      Changes made here are currently stored locally. In production, these would sync with a backend database and be reflected across all users in real-time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {localCategories.map((category) => (
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
                            Special Award - No Voting
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingCategory(editingCategory === category.id ? null : category.id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit category"
                        >
                          <Edit className="w-4 h-4" />
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
                          <button 
                            onClick={() => setShowAddNominee(showAddNominee === category.id ? null : category.id)}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Add Nominee
                          </button>
                        </div>

                        {showAddNominee === category.id && (
                          <div className="bg-white p-4 rounded-lg border border-blue-200 mb-3">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newNominee}
                                onChange={(e) => setNewNominee(e.target.value)}
                                placeholder="Enter nominee name..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onKeyPress={(e) => e.key === 'Enter' && addNominee(category.id)}
                              />
                              <button
                                onClick={() => addNominee(category.id)}
                                disabled={!newNominee.trim()}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Add
                              </button>
                              <button
                                onClick={() => {
                                  setShowAddNominee(null);
                                  setNewNominee('');
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {category.nominees.length > 0 ? (
                          <div className="grid gap-2">
                            {category.nominees.map((nominee, index) => (
                              <div key={index} className="flex justify-between items-center bg-white p-3 rounded border">
                                <span className="text-sm font-medium">{nominee}</span>
                                <button 
                                  onClick={() => removeNominee(category.id, index)}
                                  className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                                  title="Remove nominee"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                            <p className="text-yellow-700 text-sm">
                              No nominees added yet. Click "Add Nominee" to get started.
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