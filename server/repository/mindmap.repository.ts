import type { Node, Edge } from '@vue-flow/core';

export class MindmapRepository {
    private nodes: Node[] = [];
    private edges: Edge[] = [];
    
    getMindmap(): { nodes: Node[]; edges: Edge[] } {
        return { nodes: this.nodes, edges: this.edges };
    }
    
    addNode(node: Node): Node {
        this.nodes.push(node);
        return node;
    }
    
    addEdge(edge: Edge): Edge {
        this.edges.push(edge);
        return edge;
    }
    
    updateNodeLabel(nodeId: string, label: string): void {
        const node = this.nodes.find((node) => node.id === nodeId);
        if (node) {
            node.data = { ...node.data, label };
        }
    }
    
    applyNodeChanges(changes: any): void {
        for (const change of changes) {
            if (change.type === 'position') {
                if (change.position) {
                    const node = this.nodes.find((node) => node.id === change.id);
                    if (node) {
                        node.position = change.position;
                    }
                }
            } else if (change.type === 'remove') {
                this.nodes = this.nodes.filter((node) => node.id !== change.id);
            } else {
                console.log('type', change.type);
            }
        }
    }
    
    applyEdgeChanges(changes: any): void {
        for (const change of changes) {
            if (change.type === 'remove') {
                const source = change.source;
                const target = change.target;
                this.edges = this.edges.filter((edge) => !(edge.source === source && edge.target === target));
            } else {
                console.log('type', change.type);
            }
        }
    }
}
