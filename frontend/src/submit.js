import { useStore } from './store';
import { useState } from 'react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Submitting pipeline...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      const graphType = result.is_dag ? 'Yes ✅ (DAG)' : 'No ❌ (contains cycle)';

      alert(
        `Pipeline Analysis\n\n` +
          `Number of nodes: ${result.num_nodes}\n` +
          `Number of edges: ${result.num_edges}\n` +
          `Is DAG: ${graphType}`
      );
      setStatusMessage('Pipeline analysis complete.');
    } catch (error) {
      const message =
        error.name === 'AbortError'
          ? 'Request timed out. Please ensure backend is running at http://localhost:8000.'
          : `Unable to analyze pipeline. ${error.message}`;
      alert(message);
      setStatusMessage(message);
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <section className='submit-card'>
      <div className='submit-content'>
        <button type='button' className='submit-button' onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Pipeline'}
        </button>
        {statusMessage && <p className='submit-status'>{statusMessage}</p>}
      </div>
    </section>
  );
};
