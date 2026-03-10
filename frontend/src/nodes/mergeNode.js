import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      title='Merge'
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in-1`, style: { top: '35%' } },
        { type: 'target', position: Position.Left, id: `${id}-in-2`, style: { top: '70%' } },
        { type: 'source', position: Position.Right, id: `${id}-merged` },
      ]}
    >
      <span>Combines two streams into one output.</span>
    </BaseNode>
  );
};
