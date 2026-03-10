import { Handle } from 'reactflow';

const baseNodeStyles = {
  width: 240,
  minHeight: 110,
  border: '1px solid #1C2536',
  borderRadius: '10px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
};

const titleStyles = {
  fontWeight: 600,
  padding: '8px 10px',
  borderBottom: '1px solid #e5e7eb',
  color: '#1C2536',
};

const bodyStyles = {
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  fontSize: '13px',
};

export const FieldRow = ({ label, children }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <span style={{ minWidth: '52px' }}>{label}</span>
    {children}
  </label>
);

export const BaseNode = ({ title, handles = [], children }) => {
  return (
    <div style={baseNodeStyles}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          style={handle.style}
        />
      ))}
      <div style={titleStyles}>{title}</div>
      <div style={bodyStyles}>{children}</div>
    </div>
  );
};
