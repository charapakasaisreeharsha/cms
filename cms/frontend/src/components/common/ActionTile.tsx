import React from 'react';
import { Link } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ActionTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  color?: string;
}

const ActionTile: React.FC<ActionTileProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  to,
  color = 'bg-primary text-white'
}) => {
  return (
    <Link 
      to={to}
      className="block transition-transform hover:-translate-y-1"
    >
      <div className="h-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md">
        <div className={`p-4 flex justify-center ${color}`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ActionTile;