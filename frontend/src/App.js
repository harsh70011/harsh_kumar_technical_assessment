import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className='app-shell'>
      <header className='app-header'>
        <h1 className='app-title'>Pipeline Builder</h1>
        <p className='app-subtitle'>Drag nodes into the canvas and connect them to design your flow.</p>
      </header>

      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
