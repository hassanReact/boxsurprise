import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, User, RefreshCw } from 'lucide-react';
import InviteButton from '../components/InviteButton';
import InviteModal from '../components/InviteModel'; // Fixed typo in import
import { useAppDispatch, useAppSelector } from '../hooks';
import { setDirectReferrals } from '../features/auth/authSlice'; // Import the missing action

interface ReferralNode {
  id: number;
  name: string;
  level: number;
  joinDate: string;
  status: 'active' | 'inactive';
  earnings: number;
  children: ReferralNode[];
}

// Type for referral counts
interface ReferralCounts {
  tier1: number;
  tier2: number;
  tier3: number;
  tier4: number;
  total: number;
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
  // Initial empty tree structure
  const emptyTree: ReferralNode = {
    id: 1,
    name: 'You',
    level: 0,
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active',
    earnings: 0,
    children: []
  };

  const [treeData, setTreeData] = useState<ReferralNode>(emptyTree);
  const [expandedNodes, setExpandedNodes] = useState<number[]>([1]);
  const [referralCounts, setReferralCounts] = useState<ReferralCounts>({ tier1: 0, tier2: 0, tier3: 0, tier4: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');
  const [isMobile, setIsMobile] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  // Add this debugging function to your component
  // Call this in useEffect after data is loaded
useEffect(() => {
  const debugTreeData = () => {
    // console.log("Current tree data:", treeData);
    // console.log("Tree data children:", treeData.children);
    // Check if children exist and have proper structure
    if (treeData.children && treeData.children.length > 0) {
      // console.log("First child:", treeData.children[0]);
    }
    // console.log("Expanded nodes:", expandedNodes);
  };

  if (!isLoading && !error) {
    debugTreeData();
  }
}, [treeData, isLoading, error, expandedNodes]);

  // Get user from Redux store
  const user = useAppSelector((state) => state.auth.user);
  const userEmail = user?.email || '';

  // Count referrals per tier
  const countReferralsByTier = (node: ReferralNode): ReferralCounts => {
    const counts: ReferralCounts = { tier1: 0, tier2: 0, tier3: 0, tier4: 0, total: 0 };
    
    const countNodes = (node: ReferralNode) => {
      if (node.id !== 1) { // Don't count yourself
        counts.total++;
  
        // Ensure that `node.level` is a valid number and falls within the expected range
        const level = Number(node.level);
        if (!isNaN(level)) {
          if (level === 1) counts.tier1++;
          else if (level === 2) counts.tier2++;
          else if (level === 3) counts.tier3++;
          else if (level === 4) counts.tier4++;
        }
      }
  
      // Safely handle the iteration over `children`, ensuring it's an array
      if (Array.isArray(node.children)) {
        node.children.forEach(countNodes);
      }
    };
    
    countNodes(node);
    return counts;
  };
  

  // Fetch referral tree data from the backend
  const fetchReferralTree = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/referral/tree`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const responseData = await response.json();
      console.log("API response:", responseData);
      console.log("DirectReferrals:", responseData.data.directReferrals);
      const directReferralsArray = responseData.data.directReferrals;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const format = directReferralsArray.map((item: any) => item.referralId).join(', ');

      // console.log("Formatted DirectReferrals:", format);
      const updateReferrals = () => {
        dispatch(setDirectReferrals(format));
      };
      
      // Ensure the data follows our expected structure
      if (!responseData || typeof responseData !== 'object') {
        throw new Error('Invalid data format received from server');
      }
      
      // Transform the API response to match our component's expected structure
      if (responseData.message === 'Referral tree fetched successfully' && responseData.data) {
        // Create root node with user data
        const transformedData: ReferralNode = {
          id: 1, // Root ID
          name: responseData.data.name || 'You',
          level: 0,
          joinDate: new Date().toISOString().split('T')[0],
          status: 'active',
          earnings: 0,
          children: []
        };
        
        // Process direct referrals as children
        if (responseData.data.directReferrals && Array.isArray(responseData.data.directReferrals)) {
          transformedData.children = responseData.data.directReferrals.map((referral: { name?: string; joinDate?: string; status?: string; earnings?: number }, index: number) => {
            // Create child node for each direct referral
            return {
              id: 2 + index, // Generate unique sequential IDs
              name: referral.name || `Referral ${index + 1}`,
              level: 1,
              joinDate: referral.joinDate || new Date().toISOString().split('T')[0],
              status: referral.status || 'active',
              earnings: referral.earnings || 0,
              children: [] // Initialize empty children array
            };
          });
          const referralIds = responseData.data.directReferrals.map((ref: { referralId: string }) => ({
            referralId: ref.referralId,
          })); // adjust as per your structure
      updateReferrals(referralIds);
        } else{
          // Ensure children array is empty when no referrals exist
  transformedData.children = [];
        }

        // console.log("Transformed data:", transformedData);
        
        // Set the transformed data to state
        setTreeData(transformedData);
        
        // Always expand the root node
        setExpandedNodes([1]);
        
        // Calculate referral stats based on the transformed data
        const counts = countReferralsByTier(transformedData);
        setReferralCounts(counts);
      } else {
        throw new Error('Invalid data structure received from server');
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch referral tree';
      setError(errorMessage);
      console.error('Error fetching referral tree:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchReferralTree();
    
    // Set up polling to refresh data periodically (every 5 minutes)
    const intervalId = setInterval(() => {
      fetchReferralTree(true); // true indicates this is a refresh
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  // Check if screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
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
    console.log("Toggle node:", nodeId);
    if (expandedNodes.includes(nodeId)) {
      console.log("Collapsing node");
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      console.log("Expanding node");
      setExpandedNodes([...expandedNodes, nodeId]);
    }
    console.log("New expanded state:", expandedNodes.includes(nodeId) ? "expanded" : "collapsed");
  };

  // Expand or collapse all nodes
  const expandAll = () => {
    // Create a flat array of all node IDs
    const getAllNodeIds = (node: ReferralNode): number[] => {
      const ids = [node.id];
      node.children?.forEach(child => {
        ids.push(...getAllNodeIds(child));
      });
      return ids;
    };
    
    setExpandedNodes(getAllNodeIds(treeData));
  };
  
  const collapseAll = () => {
    setExpandedNodes([1]); // Only keep root node expanded
  };

  // Tree visualization style with responsive adjustments
  const renderTreeView = () => {
    const renderNodeTree = (node: ReferralNode) => {
      console.log("Rendering node:", node.id, node.name);
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
            <div className="text-xs text-gray-600">Tier {(node.level !== undefined ? node.level : 0) + 1}</div>
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
                {node.children.map((child) => (
                  <div key={child.id} className="relative">
                    {/* Vertical line to this child */}
                    <div className="w-0.5 bg-gray-300 h-6 absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-6"></div>
                    {renderNodeTree(child)}
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
              <span>Rs: {(node.earnings ?? 0).toFixed(2)}</span>
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

  // Render loading state
  const renderLoadingState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
      <p className="text-gray-600">Loading your referral network...</p>
    </div>
  );

  // Render error state
  const renderErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 max-w-md text-center">
        <p className="font-medium mb-2">Unable to load referral data</p>
        <p className="text-sm">{error}</p>
      </div>
      <button 
        onClick={() => fetchReferralTree()} 
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        <RefreshCw size={16} className="mr-2" /> Try Again
      </button>
    </div>
  );

  return (
    <div className="container mx-auto py-4 mt-8 md:py-6 px-1 md:px-3 lg:px-5">
      <div className="relative mb-4 md:mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-1xl md:text-3xl font-bold text-gray-800">Your Referral Network</h1>
          {/* <p className="text-sm md:text-base text-gray-600">View your downline structure with color-coded tiers</p> */}
        </div>
        
        {/* Refresh button */}
        <div className="absolute top-0 right-16 md:right-20">
          <button 
            onClick={() => fetchReferralTree(true)}
            disabled={isRefreshing}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            title="Refresh Data"
          >
            <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
          </button>
        </div>
        
        {/* Invite button */}
        <div className="absolute top-0 right-0">
          <InviteButton onClick={() => setIsInviteModalOpen(true)} />
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-4 md:mb-8">
        <div className="bg-white rounded-lg shadow-md p-3 md:p-6">
          <div className="mb-1 md:mb-2 text-xs md:text-sm font-medium text-gray-500">Total Network</div>
          <div className="text-xl md:text-3xl font-bold text-gray-800">
            {isLoading ? <div className="animate-pulse h-8 w-12 bg-gray-200 rounded"></div> : referralCounts.total}
          </div>
        </div>
        
        {[1, 2, 3, 4].map((tier) => {
          const colors = getTierColor(tier - 1);
          const tierCount = tier === 1 ? referralCounts.tier1 : 
                           tier === 2 ? referralCounts.tier2 : 
                           tier === 3 ? referralCounts.tier3 : 
                           referralCounts.tier4;
          
          return (
            <div key={tier} className="bg-white rounded-lg shadow-md p-3 md:p-6">
              <div className="flex items-center justify-between mb-1 md:mb-2">
                <span className="text-xs md:text-sm font-medium text-gray-500">Tier {tier}</span>
                <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${colors.bg}`}></span>
              </div>
              <div className="text-xl md:text-3xl font-bold text-gray-800">
                {isLoading ? 
                  <div className="animate-pulse h-8 w-8 bg-gray-200 rounded"></div> : 
                  tierCount
                }
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
              onClick={expandAll} 
              className="text-xs md:text-sm px-2 md:px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
            >
              Expand All
            </button>
            <button 
              onClick={collapseAll} 
              className="text-xs md:text-sm px-2 md:px-3 py-1 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100"
            >
              Collapse All
            </button>
          </div>
        </div>
        
        {/* Loading and error states */}
        {isLoading && renderLoadingState()}
        {!isLoading && error && renderErrorState()}
        
        {/* Show appropriate view based on viewport size or user selection */}
        {!isLoading && !error && (
          <>
  <div className="p-4">
    {/* <div className="mb-4">
      <strong>Debug Info:</strong> Found {treeData.children?.length || 0} direct referrals
    </div> */}
    
    <div className="overflow-x-auto max-w-full">
      {renderTreeView()}
    </div>
  </div>
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
  </>
)}
        
        {/* Empty state when no referrals */}
        {!isLoading && !error && (!treeData.children || treeData.children.length === 0) && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="bg-indigo-50 rounded-full p-4 mb-4">
              <User size={32} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Referrals Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              You haven't referred anyone yet. Share your referral link to start building your network!
            </p>
            <button 
              onClick={() => setIsInviteModalOpen(true)} 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Invite Someone
            </button>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      <InviteModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        userEmail={userEmail}
      />
    </div>
  );
};

export default ReferralTree;