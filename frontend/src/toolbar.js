import { DraggableNode } from './draggableNode';

const nodeDefinitions = [
  { type: 'customInput', label: 'Input' },
  { type: 'llm', label: 'LLM' },
  { type: 'customOutput', label: 'Output' },
  { type: 'text', label: 'Text' },
  { type: 'api', label: 'API' },
  { type: 'filter', label: 'Filter' },
  { type: 'math', label: 'Math' },
  { type: 'delay', label: 'Delay' },
  { type: 'merge', label: 'Merge' },
];

export const PipelineToolbar = () => {
  return (
    <section className='toolbar-card'>
      <h2 className='toolbar-title'>Node Library</h2>
      <p className='toolbar-help'>Drag any block into the canvas to create a new node.</p>

      <div className='toolbar-grid'>
        {nodeDefinitions.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} />
        ))}
      </div>
    </section>
  );
};
