import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { MindmapRepository } from '~/server/repository/mindmap.repository';
import { MindmapService } from '~/server/services/mindmap.service';

export default defineNitroPlugin((nitroApp: NitroApp) => {
    const engine = new Engine();
    const io = new Server();
    
    io.bind(engine);
    
    const mindmapRepository = new MindmapRepository();
    const mindmapService = new MindmapService(io, mindmapRepository);
    
    nitroApp.router.use("/socket.io/", defineEventHandler({
        handler(event) {
            engine.handleRequest(event.node.req, event.node.res);
            event._handled = true;
        },
        websocket: {
            open(peer) {
                const nodeContext = peer.ctx.node;
                const req = nodeContext.req;
                
                // @ts-expect-error private method
                engine.prepare(req);
                
                const rawSocket = nodeContext.req.socket;
                const websocket = nodeContext.ws;
                
                // @ts-expect-error private method
                engine.onWebSocket(req, rawSocket, websocket);
            }
        }
    }));
});
