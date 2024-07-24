import type { Node, Edge } from '@vue-flow/core';

type Mindmap = { nodes: Node[]; edges: Edge[] };

export class MindmapRepository {
    private mindmaps: Map<string, Mindmap> = new Map();
    
    getMindmap(roomId: string): Mindmap {
        if (!this.mindmaps.has(roomId)) {
            this.mindmaps.set(roomId, { nodes: [], edges: [] });
        }
        return this.mindmaps.get(roomId)!;
    }
    
    addNode(roomId: string, node: Node): Node {
        const mindmap = this.getMindmap(roomId);
        mindmap.nodes.push(node);
        return node;
    }
    
    addEdge(roomId: string, edge: Edge): Edge {
        const mindmap = this.getMindmap(roomId);
        mindmap.edges.push(edge);
        return edge;
    }
    
    updateNodeLabel(roomdId: string, nodeId: string, label: string): void {
        const mindmap = this.getMindmap(roomdId);
        const node = mindmap.nodes.find((node) => node.id === nodeId);
        if (node) {
            node.data = { ...node.data, label };
        }
    }
    
    applyNodeChanges(roomId: string, changes: any): void {
        const mindmap = this.getMindmap(roomId);
        for (const change of changes) {
            if (change.type === 'position') {
                if (change.position) {
                    const node = mindmap.nodes.find((node) => node.id === change.id);
                    if (node) {
                        node.position = change.position;
                    }
                }
            } else if (change.type === 'remove') {
                mindmap.nodes = mindmap.nodes.filter((node) => node.id !== change.id);
            } else {
                console.log('type', change.type);
            }
        }
    }
    
    applyEdgeChanges(roomId: string, changes: any): void {
        const mindmap = this.getMindmap(roomId);
        for (const change of changes) {
            if (change.type === 'remove') {
                const source = change.source;
                const target = change.target;
                mindmap.edges = mindmap.edges.filter((edge) => !(edge.source === source && edge.target === target));
            } else {
                console.log('type', change.type);
            }
        }
    }
}
