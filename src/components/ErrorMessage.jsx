import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, retry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 my-4 rounded-lg bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300">
      <div className="flex items-center mb-2">
        <AlertCircle className="w-6 h-6 mr-2" />
        <h3 className="text-lg font-semibold">Something went wrong</h3>
      </div>
      <p className="text-center mb-4">{message}</p>
      {retry && (
        <button 
          onClick={retry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;