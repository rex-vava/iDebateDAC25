import React from 'react';
import { ChevronRight, Check, Award } from 'lucide-react';

interface CategoryCardProps {
  category: {
    id: string;
    title: string;
    icon: string;
    description: string;
    nominees: string[];
    isAward?: boolean;
  };
  onClick: () => void;
  hasVoted: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, hasVoted }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl mb-2">{category.icon}</div>
          <div className="flex items-center gap-2">
            {category.isAward ? (
              <div className="text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1" style={{
                backgroundColor: '#f4be68'
              }}>
                <Award className="w-3 h-3" />
                Award
              </div>
            ) : hasVoted ? (
              <div className="text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1" style={{
                backgroundColor: '#a16333'
              }}>
                <Check className="w-3 h-3" />
                Voted
              </div>
            ) : null}
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {category.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {category.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {category.isAward ? 'Special Award' : `${category.nominees.length} nominees`}
          </span>
          <button className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90" style={{
            background: category.isAward 
              ? 'linear-gradient(to right, #f4be68, #eb754f)' 
              : 'linear-gradient(to right, #eb754f, #f4be68)'
          }}>
            {category.isAward ? 'View Award' : hasVoted ? 'View Vote' : 'Vote Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;