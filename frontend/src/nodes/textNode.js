import { useMemo, useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldRow } from './baseNode';

const variablePattern = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const variables = useMemo(() => {
    const found = [];
    const seen = new Set();
    let match;

    variablePattern.lastIndex = 0;

    while ((match = variablePattern.exec(currText)) !== null) {
      const variableName = match[1];
      if (!seen.has(variableName)) {
        seen.add(variableName);
        found.push(variableName);
      }
    }

    return found;
  }, [currText]);

  const nodeDimensions = useMemo(() => {
    const lines = currText.split('\n');
    const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
    const width = clamp(260 + longestLine * 2.2, 260, 520);
    const height = clamp(128 + lines.length * 24 + variables.length * 8, 128, 360);

    return { width, minHeight: height };
  }, [currText, variables.length]);

  const variableHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${variable}`,
    style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` },
  }));

  const handles = [
    ...variableHandles,
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode title='Text' handles={handles} className='text-node-dynamic' style={nodeDimensions}>
      <FieldRow label='Value'>
        <textarea
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          className='node-textarea'
          rows={Math.min(Math.max(currText.split('\n').length, 2), 8)}
          placeholder='Type text with variables like {{input}}'
        />
      </FieldRow>
      {variables.length > 0 && (
        <span className='node-note'>Variables: {variables.map((v) => `{{${v}}}`).join(', ')}</span>
      )}
    </BaseNode>
  );
};
