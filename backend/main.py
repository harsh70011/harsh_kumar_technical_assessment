from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineEdge(BaseModel):
    source: str
    target: str


class PipelinePayload(BaseModel):
    nodes: list[dict[str, Any]] = Field(default_factory=list)
    edges: list[PipelineEdge] = Field(default_factory=list)


def _is_dag(nodes: list[dict[str, Any]], edges: list[PipelineEdge]) -> bool:
    node_ids = {node.get("id") for node in nodes if node.get("id") is not None}

    indegree: dict[str, int] = {node_id: 0 for node_id in node_ids}
    adjacency: dict[str, list[str]] = defaultdict(list)

    for edge in edges:
        source = edge.source
        target = edge.target

        if source not in indegree:
            indegree[source] = 0
        if target not in indegree:
            indegree[target] = 0

        adjacency[source].append(target)
        indegree[target] += 1

    queue = deque([node_id for node_id, degree in indegree.items() if degree == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1

        for nxt in adjacency[current]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)

    return visited == len(indegree)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': _is_dag(payload.nodes, payload.edges),
    }
