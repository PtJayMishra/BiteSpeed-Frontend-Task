import { useReactFlow } from 'reactflow';

export default function NodesPanel() {
  const reactFlowInstance = useReactFlow(); // Get access to the React Flow instance

  // Dragging the node
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/reactflow', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Clicking the node (to add)
  const onClickNode = (nodeType) => {
    const id = `${nodeType}-${+new Date()}`; // Unique ID
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const position = reactFlowInstance.project({
      x: centerX - 200 + Math.random() * 100,  // slight random spread
      y: centerY - 200 + Math.random() * 100,
    });

    const newNode = {
      id,
      type: 'default',
      position,
      data: { label: `${nodeType}` },
    };

    reactFlowInstance.addNodes(newNode);
  };

  return (
    <div className="bg-white p-4 shadow rounded w-64">
      <h2 className="text-lg font-bold mb-2">Nodes Panel</h2>
      <div
        className="p-2 bg-blue-500 text-white rounded cursor-pointer select-none"
        onDragStart={(e) => onDragStart(e, 'textNode')}
        draggable
        onClick={() => onClickNode('Text Node')}
      >
        Text Node
      </div>
    </div>
  );
}
