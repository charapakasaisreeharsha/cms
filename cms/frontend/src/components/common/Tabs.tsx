import React from 'react';

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

type TabsListProps = {
  children: React.ReactNode;
  className?: string;
};

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({ 
  value, 
  onValueChange, 
  children, 
  className = '' 
}) => {
  // Create context to pass down the active tab value
  const TabsContext = React.createContext({ value, onValueChange });
  
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={`w-full ${className}`}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              tabsContext: TabsContext,
            });
          }
          return child;
        })}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ 
  children, 
  className = '',
  ...props
}) => {
  const tabsContext = (props as any).tabsContext;
  
  return (
    <div className={`flex border-b border-gray-200 ${className}`}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            tabsContext,
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  value, 
  children, 
  className = '',
  ...props
}) => {
  const tabsContext = (props as any).tabsContext;
  const isActive = tabsContext?.value === value;
  
  return (
    <button
      className={`
        px-4 py-2 text-sm font-medium transition-colors
        ${isActive 
          ? 'text-primary border-b-2 border-primary' 
          : 'text-gray-500 hover:text-gray-700'
        }
        ${className}
      `}
      onClick={() => tabsContext?.onValueChange(value)}
    >
      <div className="flex items-center">
        {children}
      </div>
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ 
  value, 
  children, 
  className = '',
  ...props
}) => {
  const tabsContext = (props as any).tabsContext;
  const isActive = tabsContext?.value === value;
  
  if (!isActive) return null;
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};