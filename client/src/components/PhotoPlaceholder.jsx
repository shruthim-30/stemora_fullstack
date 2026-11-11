import React, { useState, useRef } from 'react';
import { api } from '../services/api';

export default function PhotoPlaceholder({ 
  label = "Add photo", 
  initialImage = "", 
  onImageChange, 
  className = "",
  minHeight = "200px" 
}) {
  const [imageSrc, setImageSrc] = useState(initialImage);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      if (onImageChange) onImageChange(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server if online
    try {
      setUploading(true);
      const uploadedUrl = await api.uploadPhoto(file);
      if (uploadedUrl) {
        setImageSrc(uploadedUrl);
        if (onImageChange) onImageChange(uploadedUrl);
      }
    } catch (err) {
      console.warn('[UPLOAD] Local preview used (server upload optional):', err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`Photo: ${label}. Tap to choose or replace photo.`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ minHeight }}
      className={`relative border-3 border-navy rounded-[18px] ph-pattern flex items-center justify-center text-center text-teal-dark font-bold text-sm cursor-pointer overflow-hidden shadow-[5px_5px_0_#0D2136] transition-transform hover:-translate-y-0.5 active:translate-y-0 select-none group ${className}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-bold p-2 backdrop-blur-[2px]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Change photo
          </div>
        </>
      ) : (
        <span className="p-4 z-10 flex flex-col items-center">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0F7F7B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-2"
          >
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <circle cx="9" cy="11" r="2" />
            <path d="m21 16-5-5-8 8" />
          </svg>
          <span className="leading-tight">{label}</span>
          <small className="font-normal text-xs text-teal-dark/80 mt-1 block">
            {uploading ? 'Uploading...' : 'Tap to add photo'}
          </small>
        </span>
      )}
    </div>
  );
}
