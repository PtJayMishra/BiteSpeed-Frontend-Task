// App.jsx
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
  ReactFlowProvider, // <-- Important: Import the provider
} from 'reactflow';
import 'reactflow/dist/style.css';

import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import { nodeTypes } from './flow/nodeTypes';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Allow dropping nodes onto the canvas
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  // Handle dropping a node onto canvas
  const onDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    const position = {
      x: event.clientX - 250,
      y: event.clientY - 80,
    };

    const newNode = {
      id: `${+new Date()}`, // Unique ID based on timestamp
      type,
      position,
      data: { label: 'Text Message' },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  // Handle connecting nodes with edges
  const onConnect = useCallback((params) => {
    const sourceAlreadyConnected = edges.some(
      (e) => e.source === params.source
    );
    if (sourceAlreadyConnected) {
      alert('Only one connection allowed from a source handle!');
      return;
    }
    setEdges((eds) => addEdge(params, eds));
  }, [edges, setEdges]);

  // Handle clicking a node
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Handle text update from Settings Panel
  const handleTextChange = (text) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { ...node.data, label: text } } : node
      )
    );
    setSelectedNode((node) => ({ ...node, data: { ...node.data, label: text } }));
  };

  // Validate and Save the flow
  const handleSave = () => {
    const nodeIdsWithOutgoing = edges.map((edge) => edge.source);

    const invalidNodes = nodes.filter(
      (node) => !nodeIdsWithOutgoing.includes(node.id)
    );

    if (nodes.length > 1 && invalidNodes.length > 1) {
      alert('Error: Multiple nodes have empty targets.');
      return;
    }

    const flowData = { nodes, edges };
    console.log('Saved Flow:', flowData);
    alert('Flow saved successfully!');
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Wrap everything inside ReactFlowProvider */}
      <ReactFlowProvider>
        
        {/* Panel: Nodes or Settings */}
        <Panel position="top-left">
          {!selectedNode ? (
            <NodesPanel />
          ) : (
            <SettingsPanel
              selectedNode={selectedNode}
              onTextChange={handleTextChange}
              onBack={() => setSelectedNode(null)}
            />
          )}
        </Panel>

        {/* Save Button */}
        <Panel position="top-right" className="m-4">
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={handleSave}
          >
            Save Flow
          </button>
        </Panel>

        {/* Main Flow Canvas */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
        
      </ReactFlowProvider>
    </div>
  );
}
