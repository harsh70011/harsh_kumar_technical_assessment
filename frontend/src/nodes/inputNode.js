import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldRow } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      title='Input'
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    >
      <FieldRow label='Name'>
        <input type='text' value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </FieldRow>
      <FieldRow label='Type'>
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value='Text'>Text</option>
          <option value='File'>File</option>
        </select>
      </FieldRow>
    </BaseNode>
  );
};
