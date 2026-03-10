import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldRow } from './baseNode';

export const MathNode = ({ id }) => {
  const [operation, setOperation] = useState('sum');

  return (
    <BaseNode
      title='Math'
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '35%' } },
        { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '70%' } },
        { type: 'source', position: Position.Right, id: `${id}-result` },
      ]}
    >
      <FieldRow label='Op'>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value='sum'>Sum</option>
          <option value='multiply'>Multiply</option>
          <option value='subtract'>Subtract</option>
        </select>
      </FieldRow>
    </BaseNode>
  );
};
