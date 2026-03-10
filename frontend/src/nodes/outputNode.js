import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldRow } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      title='Output'
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-value` },
      ]}
    >
      <FieldRow label='Name'>
        <input type='text' value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </FieldRow>
      <FieldRow label='Type'>
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value='Text'>Text</option>
          <option value='Image'>Image</option>
        </select>
      </FieldRow>
    </BaseNode>
  );
};
