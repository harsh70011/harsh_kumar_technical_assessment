import { Handle } from 'reactflow';

const defaultHandleStyle = {
  width: 10,
  height: 10,
  borderRadius: '50%',
  border: '2px solid #fff',
  background: '#5b7cfa',
};

export const FieldRow = ({ label, children }) => (
  <label className='node-field'>
    <span className='node-field-label'>{label}</span>
    {children}
  </label>
);

export const BaseNode = ({ title, handles = [], children, className = '', style }) => {
  return (
    <div className={`node-shell ${className}`.trim()} style={style}>
export const BaseNode = ({ title, handles = [], children }) => {
  return (
    <div className='node-shell'>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          style={{ ...defaultHandleStyle, ...handle.style }}
        />
      ))}
      <div className='node-header'>{title}</div>
      <div className='node-body'>{children}</div>
    </div>
  );
};
