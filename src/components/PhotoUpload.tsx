import React, { useState, useRef } from 'react';
import { Upload, X, User, Camera, Check } from 'lucide-react';
import { uploadPhoto } from '../data/localData';

interface PhotoUploadProps {
  currentPhoto?: string;
  onPhotoChange: (photo: string | null) => void;
  nomineeName: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ 
  currentPhoto, 
  onPhotoChange, 
  nomineeName 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setUploadSuccess(false);
    
    try {
      const photoDataUrl = await uploadPhoto(file);
      onPhotoChange(photoDataUrl);
      setUploadSuccess(true);
      
      // Show success message briefly
      setTimeout(() => setUploadSuccess(false), 2000);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error uploading photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removePhoto = () => {
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Photo for {nomineeName}
      </label>
      
      {currentPhoto ? (
        <div className="relative inline-block">
          <img
            src={currentPhoto}
            alt={nomineeName}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-md"
          />
          <button
            onClick={removePhoto}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
            title="Remove photo"
          >
            <X className="w-3 h-3" />
          </button>
          {uploadSuccess && (
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1">
              <Check className="w-3 h-3" />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-blue-400 bg-blue-50 scale-105'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-gray-600">Uploading photo...</p>
              <p className="text-xs text-gray-500 mt-1">Processing image data</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 shadow-inner">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold shadow-lg">
                  {getInitials(nomineeName)}
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Camera className="w-4 h-4" />
                <span className="text-sm font-medium">Add Photo</span>
              </div>
              <p className="text-xs text-gray-500">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Max 5MB • JPG, PNG, GIF
              </p>
              <div className="mt-2 bg-green-50 border border-green-200 rounded px-2 py-1">
                <p className="text-xs text-green-700 font-medium">
                  ✓ Photos stored locally - works offline!
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {uploadSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700 font-medium">
              Photo uploaded successfully!
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Image is now stored locally and will be available globally
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;