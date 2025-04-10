// src/components/SettingsPanel.jsx
export default function SettingsPanel({ selectedNode, onTextChange, onBack }) {
    return (
      <div className="bg-white p-4 shadow rounded w-64">
        <h2 className="text-lg font-bold mb-2">Settings Panel</h2>
        <input
          className="border p-2 w-full"
          type="text"
          value={selectedNode?.data?.label || ''}
          onChange={(e) => onTextChange(e.target.value)}
        />
     <button
  className="mt-4 bg-black hover:bg-gray-800 text-white py-2 px-6 rounded-full transition-colors duration-300"
  onClick={onBack}
>
  Back
</button>



      </div>
    );
  }
  