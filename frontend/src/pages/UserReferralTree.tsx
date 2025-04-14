/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, User } from 'lucide-react';

interface ReferralNode {
  id: number;
  name: string;
  level: number;
  joinDate: string;
  status: 'active' | 'inactive';
  earnings: number;
  children: ReferralNode[];
}

const getTierColor = (level: number) => {
  switch (level) {
    case 0: return { bg: 'bg-purple-600', text: 'text-white', light: 'bg-purple-100' };
    case 1: return { bg: 'bg-blue-600', text: 'text-white', light: 'bg-blue-100' };
    case 2: return { bg: 'bg-violet-500', text: 'text-white', light: 'bg-violet-100' };
    case 3: return { bg: 'bg-indigo-500', text: 'text-white', light: 'bg-indigo-100' };
    default: return { bg: 'bg-cyan-500', text: 'text-white', light: 'bg-cyan-100' };
  }
};

const ReferralTree: React.FC = () => {
  // Sample data for demonstration
  const [treeData, _setTreeData] = useState<ReferralNode>({
    id: 1,
    name: 'You',
    level: 0,
    joinDate: '2023-01-01',
    status: 'active',
    earnings: 1234,
    children: [
      {
        id: 2,
        name: 'John Smith',
        level: 1,
        joinDate: '2023-02-15',
        status: 'active',
        earnings: 450,
        children: [
          {
            id: 5,
            name: 'Sarah Johnson',
            level: 2,
            joinDate: '2023-03-10',
            status: 'active',
            earnings: 120,
            children: [
              {
                id: 9,
                name: 'Emma Davis',
                level: 3,
                joinDate: '2023-05-10',
                status: 'active',
                earnings: 45,
                children: [
                  {
                    id: 13,
                    name: 'Tyler Wilson',
                    level: 4,
                    joinDate: '2023-06-20',
                    status: 'active',
                    earnings: 20,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: 6,
            name: 'Mike Brown',
            level: 2,
            joinDate: '2023-03-15',
            status: 'inactive',
            earnings: 85,
            children: [
              {
                id: 10,
                name: 'Jacob Taylor',
                level: 3,
                joinDate: '2023-05-22',
                status: 'active',
                earnings: 35,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Lisa Davis',
        level: 1,
        joinDate: '2023-02-20',
        status: 'active',
        earnings: 380,
        children: [
          {
            id: 7,
            name: 'Alex Wilson',
            level: 2,
            joinDate: '2023-04-05',
            status: 'active',
            earnings: 95,
            children: [
              {
                id: 11,
                name: 'Sophia Garcia',
                level: 3,
                joinDate: '2023-06-01',
                status: 'active',
                earnings: 30,
                children: [
                  {
                    id: 14,
                    name: 'Olivia Martin',
                    level: 4,
                    joinDate: '2023-07-15',
                    status: 'active',
                    earnings: 15,
                    children: []
                  }
                ]
              },
              {
                id: 12,
                name: 'Liam Johnson',
                level: 3,
                joinDate: '2023-06-10',
                status: 'active',
                earnings: 25,
                children: [
                  {
                    id: 15,
                    name: 'Noah Anderson',
                    level: 4,
                    joinDate: '2023-07-20',
                    status: 'active',
                    earnings: 10,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: 'Robert Lee',
        level: 1,
        joinDate: '2023-03-01',
        status: 'active',
        earnings: 310,
        children: [
          {
            id: 8,
            name: 'Emily Harris',
            level: 2,
            joinDate: '2023-04-12',
            status: 'active',
            earnings: 75,
            children: []
          }
        ]
      }
    ]
  });

  const [expandedNodes, setExpandedNodes] = useState<number[]>([1]);
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setViewMode('list');
      }
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const toggleNode = (nodeId: number) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  // Tree visualization style with responsive adjustments
  const renderTreeView = () => {
    const renderNodeTree = (node: ReferralNode, _isLastChild: boolean = false) => {
      const colorScheme = getTierColor(node.level);
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expandedNodes.includes(node.id);
      
      return (
        <div key={node.id} className="relative flex flex-col items-center">
          {/* User avatar with level-based color - smaller on small screens */}
          <div 
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${colorScheme.bg} flex items-center justify-center mb-2 shadow-md cursor-pointer`}
            onClick={() => hasChildren && toggleNode(node.id)}
          >
            <User size={isMobile ? 24 : 32} className="text-white" />
          </div>
          
          {/* User name - smaller font on small screens */}
          <div className="text-center mb-1">
            <div className="text-sm md:text-base font-semibold truncate max-w-24 md:max-w-32">{node.name}</div>
            <div className="text-xs text-gray-600">Tier {node.level + 1}</div>
          </div>
          
          {/* Toggle indicator if has children */}
          {hasChildren && (
            <div 
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border shadow-sm flex items-center justify-center cursor-pointer z-10"
              onClick={() => toggleNode(node.id)}
            >
              {isExpanded ? <ChevronDown size={isMobile ? 12 : 14} /> : <ChevronRight size={isMobile ? 12 : 14} />}
            </div>
          )}
          
          {/* Children container with responsive spacing */}
          {isExpanded && hasChildren && (
            <div className="pt-6 mt-2 w-full">
              {/* Vertical line connecting to children */}
              <div className="w-0.5 bg-gray-300 h-6 absolute left-1/2 top-20 md:top-24 transform -translate-x-1/2"></div>
              
              {/* Horizontal line above children */}
              {node.children.length > 1 && (
                <div className="h-0.5 bg-gray-300 absolute top-26 md:top-30 left-1/4 right-1/4"></div>
              )}
              
              {/* Children with responsive spacing */}
              <div className="flex justify-center space-x-4 md:space-x-8">
                {node.children.map((child, index) => (
                  <div key={child.id} className="relative">
                    {/* Vertical line to this child */}
                    <div className="w-0.5 bg-gray-300 h-6 absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-6"></div>
                    {renderNodeTree(child, index === node.children.length - 1)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="flex justify-center w-full p-2 md:p-6 overflow-auto">
        <div className="inline-block min-w-full scale-90 md:scale-100">
          {renderNodeTree(treeData)}
        </div>
      </div>
    );
  };

  // List view style (for mobile or detailed view)
  const renderListView = (node: ReferralNode, depth: number = 0) => {
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const colorScheme = getTierColor(node.level);

    return (
      <div key={node.id} className="select-none">
        <div 
          className="flex items-center px-2 md:px-4 py-2 md:py-3 hover:bg-gray-50 cursor-pointer border-b"
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          {hasChildren && (
            <div 
              className="mr-2 cursor-pointer"
              onClick={() => toggleNode(node.id)}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
          {!hasChildren && <div className="w-4 mr-2"></div>}
          
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${colorScheme.bg} flex items-center justify-center mr-2 md:mr-3 shadow-sm`}>
            <User size={16} className="text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800 text-sm md:text-base truncate mr-2">{node.name}</span>
              <span className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs rounded-full whitespace-nowrap ${
                node.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {node.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
              <span>Tier {node.level + 1}</span>
              <span>Rs: {node.earnings.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {node.children.map(child => renderListView(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Count referrals per tier
  const countReferralsByTier = () => {
    const counts = { tier1: 0, tier2: 0, tier3: 0, tier4: 0, total: 0 };
    
    const countNodes = (node: ReferralNode) => {
      if (node.id !== 1) { // Don't count yourself
        counts.total++;
        if (node.level === 1) counts.tier1++;
        else if (node.level === 2) counts.tier2++;
        else if (node.level === 3) counts.tier3++;
        else if (node.level === 4) counts.tier4++;
      }
      
      node.children.forEach(countNodes);
    };
    
    countNodes(treeData);
    return counts;
  };
  
  const referralCounts = countReferralsByTier();

  return (
    <div className="container mx-auto py-4 md:py-6 px-2 md:px-4 lg:px-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Referral Network</h1>
        <p className="text-sm md:text-base text-gray-600">View your downline structure with color-coded tiers</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-8">
        <div className="bg-white rounded-lg shadow-md p-3 md:p-6">
          <div className="mb-1 md:mb-2 text-xs md:text-sm font-medium text-gray-500">Total Network</div>
          <div className="text-xl md:text-3xl font-bold text-gray-800">{referralCounts.total}</div>
        </div>
        
        {[1, 2, 3, 4].map((tier) => {
          const colors = getTierColor(tier - 1);
          return (
            <div key={tier} className="bg-white rounded-lg shadow-md p-3 md:p-6">
              <div className="flex items-center justify-between mb-1 md:mb-2">
                <span className="text-xs md:text-sm font-medium text-gray-500">Tier {tier}</span>
                <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${colors.bg}`}></span>
              </div>
              <div className="text-xl md:text-3xl font-bold text-gray-800">
                {tier === 1 ? referralCounts.tier1 : tier === 2 ? referralCounts.tier2 : tier === 3 ? referralCounts.tier3 : referralCounts.tier4}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-md p-2 md:p-4 mb-4 md:mb-8">
        <div className="flex flex-wrap gap-2 md:gap-4">
          {[1, 2, 3, 4].map((tier) => {
            const colors = getTierColor(tier - 1);
            return (
              <div key={tier} className="flex items-center">
                <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${colors.bg} mr-1 md:mr-2`}></div>
                <span className="text-xs md:text-sm">Tier {tier} Referrals</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main visualization card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b p-3 md:p-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
          <h2 className="text-lg md:text-xl font-semibold">Referral Tree</h2>
          
          {/* View toggle buttons for mobile */}
          <div className="flex items-center space-x-2 mr-auto md:mr-0 md:hidden">
            <button 
              onClick={() => setViewMode('tree')} 
              className={`text-xs px-2 py-1 rounded-md ${viewMode === 'tree' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}
            >
              Tree View
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`text-xs px-2 py-1 rounded-md ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}
            >
              List View
            </button>
          </div>
          
          <div className="flex gap-2 md:gap-3">
            <button 
              onClick={() => setExpandedNodes([1, ...Array.from(new Array(15)).map((_, i) => i + 2)])} 
              className="text-xs md:text-sm px-2 md:px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
            >
              Expand All
            </button>
            <button 
              onClick={() => setExpandedNodes([1])} 
              className="text-xs md:text-sm px-2 md:px-3 py-1 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100"
            >
              Collapse All
            </button>
          </div>
        </div>
        
        {/* Show appropriate view based on viewport size or user selection */}
        {(!isMobile || viewMode === 'tree') && (
          <div className="overflow-x-auto max-w-full">
            {renderTreeView()}
          </div>
        )}
        
        {/* List view (shown by default on mobile or when selected) */}
        {(isMobile && viewMode === 'list') ? (
          <div className="pt-2">
            <div className="border rounded-md mx-2 md:mx-6 mb-4 md:mb-6 overflow-hidden">
              {renderListView(treeData)}
            </div>
          </div>
        ) : !isMobile && (
          <div className="border-t pt-4 md:pt-6">
            <div className="px-4 md:px-6 mb-2 md:mb-3">
              <h3 className="font-medium text-sm md:text-base">Detailed List View</h3>
            </div>
            <div className="border rounded-md mx-2 md:mx-6 mb-4 md:mb-6 overflow-hidden">
              {renderListView(treeData)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralTree;