import { useStore } from './store';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
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
    } catch (error) {
      alert(`Unable to analyze pipeline. ${error.message}`);
    }
  };

  return (
    <section className='submit-card'>
      <button type='button' className='submit-button' onClick={handleSubmit}>
        Submit Pipeline
      </button>
    </section>
  );
};
