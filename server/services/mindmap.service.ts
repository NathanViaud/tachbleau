import { Server, Socket } from 'socket.io';
import { MindmapRepository } from '~/server/repository/mindmap.repository';
import type { Edge, Node } from '@vue-flow/core';

export class MindmapService {
    private io: Server;
    private mindmapRepository: MindmapRepository;
    
    constructor(io: Server, mindmapRepository: MindmapRepository) {
        this.io = io;
        this.mindmapRepository = mindmapRepository;
        this.initializeListeners();
    }
    
    private initializeListeners() {
        this.io.on('connection', (socket) => {
            socket.on('mindmap:get', () => this.getMindmap(socket))
            socket.on('mindmap:addNode', (data) => this.addNode(data, socket))
            socket.on('mindmap:addEdge', (data) => this.addEdge(data, socket))
            socket.on('mindmap:updateNodeLabel', (data) => this.updateNodeLabel(data, socket))
            socket.on('mindmap:nodeChanges', (data) => this.applyNodeChanges(data, socket))
            socket.on('mindmap:edgeChanges', (data) => this.applyEdgeChanges(data, socket))
        })
    }
    
    private async getMindmap(socket: Socket) {
        const mindmap = this.mindmapRepository.getMindmap();
        socket.emit('mindmap:get', mindmap);
    }
    
    private async addNode(data: Node, socket: Socket) {
        const node = this.mindmapRepository.addNode(data);
        socket.broadcast.emit('mindmap:addNode', node);
    }
    
    private async addEdge(data: Edge, socket: Socket) {
        const edge = this.mindmapRepository.addEdge(data);
        socket.broadcast.emit('mindmap:addEdge', edge);
    }
    
    private async updateNodeLabel(data: { nodeId: string, label: string }, socket: Socket) {
        this.mindmapRepository.updateNodeLabel(data.nodeId, data.label);
        socket.broadcast.emit('mindmap:updateNodeLabel', data);
    }
    
    private async applyNodeChanges(data: any, socket: Socket) {
        this.mindmapRepository.applyNodeChanges(data);
        
        socket.broadcast.emit('mindmap:nodeChanges', data);
    }
    
    private async applyEdgeChanges(data: any, socket: Socket) {
        this.mindmapRepository.applyEdgeChanges(data);
        
        socket.broadcast.emit('mindmap:edgeChanges', data);
    }
}
