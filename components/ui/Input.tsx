import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-base placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 py-3 ${icon ? 'pl-11 pr-4' : 'px-4'} outline-none ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};