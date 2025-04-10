// components/TextNode.jsx
import { Handle, Position } from 'reactflow';

// A single Text Node in the Flow
export default function TextNode({ data }) {
  return (
    <div className="p-4 bg-white rounded shadow-md border">
      <div className="font-semibold"> {data.label}</div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        style={{ background: '#555' }}
      />

      <Handle
        type="target"
        position={Position.Top}
        id="target"
        style={{ background: '#555' }}
      />
    </div>
  );
}
