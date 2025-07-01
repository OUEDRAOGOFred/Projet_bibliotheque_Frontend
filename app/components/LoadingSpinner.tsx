"use client";

import React from 'react';
import { APP_TEXTS } from '../constants/texts';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function LoadingSpinner({ 
  message = APP_TEXTS.MESSAGES.LOADING_BOOKS,
  size = 'md',
  fullScreen = false
}: LoadingSpinnerProps) {
  const getSpinnerSize = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-12 w-12';
      case 'md':
      default:
        return 'h-8 w-8';
    }
  };

  const spinner = (
    <div className="text-center">
      <div className={`inline-block animate-spin rounded-full border-b-2 border-[#003087] ${getSpinnerSize()}`}></div>
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
} 