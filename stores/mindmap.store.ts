import { defineStore } from 'pinia'
import type { Edge, EdgeChange, Node, NodeChange, XYPosition } from '@vue-flow/core';
import { applyEdgeChanges, applyNodeChanges } from '@vue-flow/core';
import { socket } from '~/socket';
import { nanoid } from 'nanoid';

interface MindmapState {
    connected: boolean;
    currentRoom: string | null;
    nodes: Node[]
    edges: Edge[]
}

export const useMindmap = defineStore('mindmap', {
    state: (): MindmapState => ({
        connected: false,
        currentRoom: null,
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
            socket.on('room:joined', (roomId: string) => {
                this.currentRoom = roomId
                socket.emit('mindmap:get', this.currentRoom)
            })
            
            socket.on('room:left', () => {
                this.currentRoom = null;
                this.reset();
            });

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
        
        joinRoom(roomId: string) {
            socket.emit('room:join', roomId)
        },
        
        leaveRoom() {
            if (this.currentRoom) {
                socket.emit('room:leave', this.currentRoom)
            }
        },
        
        getMindmap() {
            if (this.currentRoom) {
                socket.emit('mindmap:get', this.currentRoom)
            }
        },
        
        addNode(node: Node) {
            if (!this.currentRoom) return
            
            this.nodes.push(node)
            
            socket.emit('mindmap:addNode', { roomId: this.currentRoom, node });
        },
        
        addChildNode(parentNode: Node, position: XYPosition) {
            if (!this.currentRoom) return
            
            const id = nanoid();
            const newNode: Node = {
                id,
                type: 'custom',
                data: { label: `Node ${id}` },
                position,
                parentNode: parentNode.id
            }
            
            this.nodes.push(newNode);
            socket.emit('mindmap:addNode', { roomId: this.currentRoom, node: newNode });
            
            const newEdge: Edge = {
                id: nanoid(),
                source: parentNode.id,
                target: newNode.id,
                type: 'straight'
            }
            
            this.addEdge(newEdge)
        },
        
        addEdge(edge: Edge) {
            if (!this.currentRoom) return
            
            this.edges.push(edge)
            
            socket.emit('mindmap:addEdge', { roomId: this.currentRoom, edge });
        },
        updateNodeLabel(nodeId: string, label: string) {
            if (!this.currentRoom) return
            
            const node = this.nodes.find((node: Node) => node.id === nodeId)
            if (!node) return
            node.data = { ...node.data, label }
            
            socket.emit('mindmap:updateNodeLabel', { roomId: this.currentRoom, nodeId, label })
        },
        reset() {
            this.nodes = []
            this.edges = []
        },
        
        onChanges(changes: any) {
            if (!this.currentRoom) return
            
            const filteredChanges = changes.filter((change: any) => change.type !== 'select')
            socket.emit('mindmap:nodeChanges', { roomId: this.currentRoom, changes: filteredChanges });
        },
        
        onEdgeChanges(changes: any) {
            if (!this.currentRoom) return
            
            const filteredChanges = changes.filter((change: any) => change.type !== 'select' && change.type !== 'dimensions')
            socket.emit('mindmap:edgeChanges', { roomId: this.currentRoom, changes: filteredChanges })
        },
        
        getNode(id: string): Node | undefined {
            return this.nodes.find((node) => node.id === id)
        },
    }
})
