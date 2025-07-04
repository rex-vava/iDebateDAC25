import React, { useState } from 'react';
import { X, Users, BarChart3, Plus, Trash2, Edit, LogOut, Shield, Clock, Save, AlertCircle, Camera } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCategories } from '../hooks/useCategories';
import VoteStatsPanel from './VoteStatsPanel';
import PhotoUpload from './PhotoUpload';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { logout, extendSession } = useAuth();
  const { categories, addNominee, removeNominee, updateNomineePhoto, updateCategory, loading } = useCategories();
  const [activeTab, setActiveTab] = useState<'stats' | 'manage'>('stats');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newNominee, setNewNominee] = useState('');
  const [showAddNominee, setShowAddNominee] = useState<string | null>(null);
  const [editingNominee, setEditingNominee] = useState<{categoryId: string, nomineeId: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      onClose();
    }
  };

  const handleExtendSession = () => {
    extendSession();
    alert('Session extended for another 24 hours');
  };

  const handleAddNominee = async (categoryId: string) => {
    if (!newNominee.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    const success = await addNominee(categoryId, { name: newNominee.trim() });
    
    if (success) {
      setNewNominee('');
      setShowAddNominee(null);
      alert('Nominee added successfully!');
    } else {
      alert('Failed to add nominee. Please try again.');
    }
    setIsSubmitting(false);
  };

  const handleRemoveNominee = async (categoryId: string, nomineeId: string, nomineeName: string) => {
    if (confirm(`Are you sure you want to remove "${nomineeName}"? This will also remove all votes for this nominee.`)) {
      setIsSubmitting(true);
      const success = await removeNominee(categoryId, nomineeId);
      
      if (success) {
        alert('Nominee removed successfully!');
      } else {
        alert('Failed to remove nominee. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = async (nomineeId: string, photo: string | null) => {
    setIsSubmitting(true);
    const success = await updateNomineePhoto(nomineeId, photo || '');
    
    if (success) {
      alert('Photo updated successfully!');
      setEditingNominee(null);
    } else {
      alert('Failed to update photo. Please try again.');
    }
    setIsSubmitting(false);
  };

  const handleCategoryEdit = async (categoryId: string, field: string, value: string) => {
    const success = await updateCategory(categoryId, { [field]: value });
    if (!success) {
      alert('Failed to update category. Please try again.');
    }
  };

  const handleSaveCategory = async (categoryId: string) => {
    setEditingCategory(null);
    alert('Category changes saved successfully!');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                  <p className="text-green-700 text-sm font-medium">
                    ✓ All changes are saved locally
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className={`rounded-lg p-6 border-2 ${
                    category.is_award 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        {editingCategory === category.id ? (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category Title
                              </label>
                              <input
                                type="text"
                                value={category.title}
                                onChange={(e) => handleCategoryEdit(category.id, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter category title"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <textarea
                                value={category.description}
                                onChange={(e) => handleCategoryEdit(category.id, 'description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={2}
                                placeholder="Enter category description"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <h5 className="text-lg font-semibold text-gray-900">
                              {category.icon} {category.title}
                            </h5>
                            <p className="text-sm text-gray-600">{category.description}</p>
                          </>
                        )}
                        {category.is_award && (
                          <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Special Award - No Voting
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            if (editingCategory === category.id) {
                              handleSaveCategory(category.id);
                            } else {
                              setEditingCategory(category.id);
                            }
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            editingCategory === category.id
                              ? 'bg-green-100 text-green-600 hover:bg-green-200'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                          title={editingCategory === category.id ? "Save changes" : "Edit category"}
                        >
                          {editingCategory === category.id ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    {!category.is_award && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h6 className="font-medium text-gray-700">
                            Nominees ({category.nominees.length})
                            {category.nominees.length === 0 && (
                              <span className="text-yellow-600 text-sm ml-2">(No nominees yet)</span>
                            )}
                          </h6>
                          <button 
                            onClick={() => setShowAddNominee(showAddNominee === category.id ? null : category.id)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors"
                            disabled={isSubmitting}
                          >
                            <Plus className="w-4 h-4" />
                            Add Nominee
                          </button>
                        </div>

                        {showAddNominee === category.id && (
                          <div className="bg-white p-4 rounded-lg border-2 border-blue-200 mb-3">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newNominee}
                                onChange={(e) => setNewNominee(e.target.value)}
                                placeholder="Enter nominee name..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddNominee(category.id)}
                                disabled={isSubmitting}
                              />
                              <button
                                onClick={() => handleAddNominee(category.id)}
                                disabled={!newNominee.trim() || isSubmitting}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                {isSubmitting ? 'Adding...' : 'Add'}
                              </button>
                              <button
                                onClick={() => {
                                  setShowAddNominee(null);
                                  setNewNominee('');
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                                disabled={isSubmitting}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {category.nominees.length > 0 ? (
                          <div className="grid gap-4">
                            {category.nominees.map((nominee) => (
                              <div key={nominee.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0">
                                    {nominee.photo ? (
                                      <div className="relative">
                                        <img
                                          src={nominee.photo}
                                          alt={nominee.name}
                                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                        />
                                        <button
                                          onClick={() => setEditingNominee(
                                            editingNominee?.nomineeId === nominee.id
                                              ? null 
                                              : { categoryId: category.id, nomineeId: nominee.id }
                                          )}
                                          className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition-colors"
                                          title="Change photo"
                                        >
                                          <Camera className="w-3 h-3" />
                                        </button>
                                      </div>
                                    ) : (
                                      <div 
                                        className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-lg border-2 border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => setEditingNominee(
                                          editingNominee?.nomineeId === nominee.id
                                            ? null 
                                            : { categoryId: category.id, nomineeId: nominee.id }
                                        )}
                                        title="Add photo"
                                      >
                                        {nominee.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2)}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h6 className="font-semibold text-gray-900">{nominee.name}</h6>
                                        <p className="text-sm text-gray-500">Nominee</p>
                                      </div>
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => setEditingNominee(
                                            editingNominee?.nomineeId === nominee.id
                                              ? null 
                                              : { categoryId: category.id, nomineeId: nominee.id }
                                          )}
                                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                          title="Manage photo"
                                        >
                                          <Camera className="w-4 h-4" />
                                        </button>
                                        <button 
                                          onClick={() => handleRemoveNominee(category.id, nominee.id, nominee.name)}
                                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                          title="Remove nominee"
                                          disabled={isSubmitting}
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                    
                                    {editingNominee?.nomineeId === nominee.id && (
                                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                                        <PhotoUpload
                                          currentPhoto={nominee.photo}
                                          onPhotoChange={(photo) => handlePhotoChange(nominee.id, photo)}
                                          nomineeName={nominee.name}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
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