import { defineStore } from 'pinia'
import type { Edge, EdgeChange, Node, NodeChange, XYPosition } from '@vue-flow/core';
import { applyEdgeChanges, applyNodeChanges } from '@vue-flow/core';
import { socket } from '~/socket';
import { nanoid } from 'nanoid';

interface MindmapState {
    connected: boolean;
    nodes: Node[]
    edges: Edge[]
}

export const useMindmap = defineStore('mindmap', {
    state: (): MindmapState => ({
        connected: false,
        nodes: [],
        edges: [],
    }),
    actions: {
        setup() {
            if (socket.connected) {
                this.bindEvents()
                this.connected = true;
            } else {
                socket.on('connect', () => {
                    this.connected = true;
                    this.bindEvents()
                })
            }
            
            socket.on('disconnect', () => {
                this.connected = false;
            });
        },
        
        bindEvents() {
            socket.emit('mindmap:get')

            socket.on('mindmap:get', (data: {
                nodes: Node[]
                edges: Edge[]
            }) => {
                this.nodes = data.nodes
                this.edges = data.edges
            })

            socket.on('mindmap:addNode', (node: Node) => {
                this.nodes.push(node)
            });

            socket.on('mindmap:addEdge', (edge: Edge) => {
                this.edges.push(edge)
            });

            socket.on('mindmap:nodeChanges', (changes: NodeChange[]) => {
                // @ts-expect-error
                applyNodeChanges(changes, this.nodes);
            })

            socket.on('mindmap:edgeChanges', (changes: EdgeChange[]) => {
                // @ts-expect-error
                applyEdgeChanges(changes, this.edges);
            })

            socket.on('mindmap:updateNodeLabel', ({ nodeId, label }: { nodeId: string, label: string }) => {
                const node = this.nodes.find((node: Node) => node.id === nodeId)
                if (!node) return
                node.data = { ...node.data, label }
            })
        },
        
        connect() {
            socket.connect();
        },
        
        addNode(node: Node) {
            this.nodes.push(node)
            console.log('node added', this.nodes);
            
            console.log('emitting addNode');
            socket.emit('mindmap:addNode', node);
        },
        
        addChildNode(parentNode: Node, position: XYPosition) {
            const id = nanoid();
            const newNode: Node = {
                id,
                type: 'custom',
                data: { label: `Node ${id}` },
                position,
                parentNode: parentNode.id
            }
            
            this.nodes.push(newNode);
            socket.emit('mindmap:addNode', newNode);
            
            const newEdge: Edge = {
                id: nanoid(),
                source: parentNode.id,
                target: newNode.id,
                type: 'straight'
            }
            
            this.addEdge(newEdge)
        },
        
        addEdge(edge: Edge) {
            this.edges.push(edge)
            
            socket.emit('mindmap:addEdge', edge);
        },
        updateNodeLabel(nodeId: string, label: string) {
            const node = this.nodes.find((node: Node) => node.id === nodeId)
            if (!node) return
            node.data = { ...node.data, label }
            
            socket.emit('mindmap:updateNodeLabel', { nodeId, label })
        },
        reset() {
            this.nodes = []
            this.edges = []
        },
        
        onChanges(changes: any) {
            const filteredChanges = changes.filter((change: any) => change.type !== 'select')
            socket.emit('mindmap:nodeChanges', filteredChanges);
        },
        
        onEdgeChanges(changes: any) {
            const filteredChanges = changes.filter((change: any) => change.type !== 'select' && change.type !== 'dimensions')
            socket.emit('mindmap:edgeChanges', filteredChanges)
        },
        
        getNode(id: string): Node | undefined {
            return this.nodes.find((node) => node.id === id)
        }
    }
})
