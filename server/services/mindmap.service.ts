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
            socket.on('room:join', (roomId) => this.joinRoom(roomId, socket))
            socket.on('room:leave', (roomId) => this.leaveRoom(roomId, socket))
            
            socket.on('mindmap:get', (roomId) => this.getMindmap(roomId, socket))
            socket.on('mindmap:addNode', (data) => this.addNode(data, socket))
            socket.on('mindmap:addEdge', (data) => this.addEdge(data, socket))
            socket.on('mindmap:updateNodeLabel', (data) => this.updateNodeLabel(data, socket))
            socket.on('mindmap:nodeChanges', (data) => this.applyNodeChanges(data, socket))
            socket.on('mindmap:edgeChanges', (data) => this.applyEdgeChanges(data, socket))
        })
    }
    
    private joinRoom(roomId: string, socket: Socket) {
        socket.join(roomId);
        socket.emit('room:joined', roomId);
    }
    
    private leaveRoom(roomId: string, socket: Socket) {
        socket.leave(roomId);
        socket.emit('room:left', roomId);
    }
    
    private async getMindmap(roomId: string, socket: Socket) {
        const mindmap = this.mindmapRepository.getMindmap(roomId);
        socket.emit('mindmap:get', mindmap);
    }
    
    private async addNode(data: { roomId: string, node: Node }, socket: Socket) {
        const node = this.mindmapRepository.addNode(data.roomId, data.node);
        socket.to(data.roomId).emit('mindmap:addNode', node);
    }
    
    private async addEdge(data: { roomId: string, edge: Edge }, socket: Socket) {
        const edge = this.mindmapRepository.addEdge(data.roomId, data.edge);
        socket.to(data.roomId).emit('mindmap:addEdge', edge);
    }
    
    private async updateNodeLabel(data: { roomId: string, nodeId: string, label: string }, socket: Socket) {
        this.mindmapRepository.updateNodeLabel(data.roomId, data.nodeId, data.label);
        socket.to(data.roomId).emit('mindmap:updateNodeLabel',{ nodeId: data.nodeId, label: data.label });
    }
    
    private async applyNodeChanges(data: { roomId: string, changes: any }, socket: Socket) {
        this.mindmapRepository.applyNodeChanges(data.roomId, data.changes);
        
        socket.to(data.roomId).emit('mindmap:nodeChanges', data.changes);
    }
    
    private async applyEdgeChanges(data: { roomId: string, changes: any }, socket: Socket) {
        this.mindmapRepository.applyEdgeChanges(data.roomId, data.changes);
        
        socket.to(data.roomId).emit('mindmap:edgeChanges', data.changes);
    }
}
