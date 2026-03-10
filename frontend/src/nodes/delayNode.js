import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldRow } from './baseNode';

export const DelayNode = ({ id }) => {
  const [seconds, setSeconds] = useState(1);

  return (
    <BaseNode
      title='Delay'
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <FieldRow label='Secs'>
        <input
          type='number'
          min='0'
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          style={{ width: '70px' }}
        />
      </FieldRow>
    </BaseNode>
  );
};
