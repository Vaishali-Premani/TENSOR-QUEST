import React, { useState } from 'react';

const AlgorithmLearningPath = () => {
  // Data structure representing the learning path
  const nodes = [
    { id: 'arrays', label: 'Arrays & Hashing', level: 0, position: 50 },
    { id: 'two-pointers', label: 'Two Pointers', level: 1, position: 35 },
    { id: 'stack', label: 'Stack', level: 1, position: 65 },
    { id: 'binary-search', label: 'Binary Search', level: 2, position: 25 },
    { id: 'sliding-window', label: 'Sliding Window', level: 2, position: 50 },
    { id: 'linked-list', label: 'Linked List', level: 2, position: 75 },
    { id: 'trees', label: 'Trees', level: 3, position: 50 },
    { id: 'tries', label: 'Tries', level: 4, position: 25 },
    { id: 'heap', label: 'Heap / Priority Queue', level: 4, position: 50 },
    { id: 'backtracking', label: 'Backtracking', level: 4, position: 75 },
    { id: 'intervals', label: 'Intervals', level: 5, position: 20 },
    { id: 'greedy', label: 'Greedy', level: 5, position: 35 },
    { id: 'advanced-graphs', label: 'Advanced Graphs', level: 5, position: 50 },
    { id: 'graphs', label: 'Graphs', level: 5, position: 65 },
    { id: '1d-dp', label: '1-D DP', level: 5, position: 80 },
    { id: '2d-dp', label: '2-D DP', level: 6, position: 65 },
    { id: 'bit-manipulation', label: 'Bit Manipulation', level: 6, position: 80 },
    { id: 'math', label: 'Math & Geometry', level: 7, position: 72 },
  ];

  const edges = [
    { from: 'arrays', to: 'two-pointers' },
    { from: 'arrays', to: 'stack' },
    { from: 'two-pointers', to: 'binary-search' },
    { from: 'two-pointers', to: 'sliding-window' },
    { from: 'two-pointers', to: 'linked-list' },
    { from: 'binary-search', to: 'trees' },
    { from: 'sliding-window', to: 'trees' },
    { from: 'linked-list', to: 'trees' },
    { from: 'trees', to: 'tries' },
    { from: 'trees', to: 'heap' },
    { from: 'trees', to: 'backtracking' },
    { from: 'heap', to: 'intervals' },
    { from: 'heap', to: 'greedy' },
    { from: 'backtracking', to: 'graphs' },
    { from: 'backtracking', to: '1d-dp' },
    { from: 'graphs', to: 'advanced-graphs' },
    { from: 'graphs', to: '2d-dp' },
    { from: '1d-dp', to: 'bit-manipulation' },
    { from: '2d-dp', to: 'math' },
    { from: 'bit-manipulation', to: 'math' },
  ];

  const [selectedNode, setSelectedNode] = useState(null);

  const getConnectedNodes = (nodeId) => {
    const prerequisites = edges.filter(edge => edge.to === nodeId).map(edge => edge.from);
    const nextTopics = edges.filter(edge => edge.from === nodeId).map(edge => edge.to);
    return { prerequisites, nextTopics };
  };

  return (
    <div className="w-full h-screen bg-gray-900 p-8">
      <div className="relative w-full h-full">
        {/* Draw edges first so they appear behind nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            
            const x1 = `${fromNode.position}%`;
            const x2 = `${toNode.position}%`;
            const y1 = `${(fromNode.level * 12) + 5}%`;
            const y2 = `${(toNode.level * 12) + 5}%`;
            
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={`stroke-2 ${
                  selectedNode && (edge.from === selectedNode || edge.to === selectedNode)
                    ? 'stroke-blue-300'
                    : 'stroke-gray-600'
                } transition-colors duration-300`}
              />
            );
          })}
        </svg>

        {/* Draw nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300
              ${selectedNode === node.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' 
                : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            style={{
              left: `${node.position}%`,
              top: `${(node.level * 12) + 5}%`,
            }}
            onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
          >
            <span className="whitespace-nowrap text-sm font-medium">{node.label}</span>
          </div>
        ))}

        {/* Topic details panel */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 bg-gray-800 rounded-lg p-4 text-white">
            <h3 className="text-lg font-semibold mb-4">{nodes.find(n => n.id === selectedNode).label}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Prerequisites:</h4>
                <div className="flex flex-wrap gap-2">
                  {getConnectedNodes(selectedNode).prerequisites.map(prereqId => (
                    <span key={prereqId} className="px-2 py-1 bg-gray-700 rounded-md text-sm">
                      {nodes.find(n => n.id === prereqId).label}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Next Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {getConnectedNodes(selectedNode).nextTopics.map(nextId => (
                    <span key={nextId} className="px-2 py-1 bg-gray-700 rounded-md text-sm">
                      {nodes.find(n => n.id === nextId).label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmLearningPath;