import React, { useState } from 'react';
import { ChevronDown, ChevronRight, User, Users } from 'lucide-react';

interface ReferralNode {
  id: number;
  name: string;
  level: number;
  joinDate: string;
  status: 'active' | 'inactive';
  earnings: number;
  children: ReferralNode[];
}

const ReferralTree: React.FC = () => {
  // Sample data for demonstration
  const [treeData, setTreeData] = useState<ReferralNode>({
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
            children: []
          },
          {
            id: 6,
            name: 'Mike Brown',
            level: 2,
            joinDate: '2023-03-15',
            status: 'inactive',
            earnings: 85,
            children: []
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
            children: []
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
        children: []
      }
    ]
  });

  const [expandedNodes, setExpandedNodes] = useState<number[]>([1, 2, 3]);

  const toggleNode = (nodeId: number) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  const renderNode = (node: ReferralNode, depth: number = 0) => {
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center top-3 px-4 py-2 hover:bg-gray-50 cursor-pointer ${depth === 0 ? 'bg-indigo-50' : ''}`}
          style={{ paddingLeft: `${depth * 20 + 16}px` }}
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
          
          <div className={`w-8 h-8 rounded-full ${depth === 0 ? 'bg-indigo-600' : 'bg-indigo-100'} flex items-center justify-center mr-3`}>
            <User size={16} className={depth === 0 ? 'text-white' : 'text-indigo-600'} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">{node.name}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                node.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {node.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Level {node.level}</span>
              <span>${node.earnings.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Referral Tree</h1>
        <p className="text-gray-600">Visualize your downline structure and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-indigo-100 p-3 mr-4 text-indigo-600">
            <Users size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-700">27</p>
            <p className="text-sm text-gray-500">Total network size</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4 text-green-600">
            <Users size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-700">3</p>
            <p className="text-sm text-gray-500">Direct referrals</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4 text-purple-600">
            <Users size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-700">24</p>
            <p className="text-sm text-gray-500">Indirect referrals</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Your Referral Network</h2>
          <p className="text-sm text-gray-600 mt-1">Click on a user to expand their downline</p>
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-600 mb-2 flex justify-between">
            <span>Total Earnings: $1,234.00</span>
            <span>Max Level: 3</span>
          </div>
          <div className="border rounded-md overflow-hidden">
            {renderNode(treeData)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralTree;