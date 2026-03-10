import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldRow } from './baseNode';

export const FilterNode = ({ id }) => {
  const [condition, setCondition] = useState('score > 0.8');

  return (
    <BaseNode
      title='Filter'
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-pass` },
        { type: 'source', position: Position.Right, id: `${id}-fail`, style: { top: '75%' } },
      ]}
    >
      <FieldRow label='Rule'>
        <input value={condition} onChange={(e) => setCondition(e.target.value)} />
      </FieldRow>
    </BaseNode>
  );
};
