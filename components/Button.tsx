import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-bold transition-all duration-200 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm";
  
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-600 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-slate-900 hover:bg-slate-100 focus:ring-white shadow-md",
    outline: "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white focus:ring-slate-900",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};