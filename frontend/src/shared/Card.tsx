import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
