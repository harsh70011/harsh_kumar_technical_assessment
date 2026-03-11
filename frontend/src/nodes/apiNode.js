import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldRow } from './baseNode';

export const APINode = ({ id }) => {
  const [method, setMethod] = useState('GET');

  return (
    <BaseNode
      title='API'
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-request` },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <FieldRow label='Method'>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
        </select>
      </FieldRow>
    </BaseNode>
  );
};
