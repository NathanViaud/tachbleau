<script setup lang="ts">
import { Background } from '@vue-flow/background';
import {
    VueFlow,
    Panel,
    type Node,
    useVueFlow,
    type OnConnectStartParams,
    type Edge
} from '@vue-flow/core'
import { useMindmap } from '~/stores/mindmap.store';
import { getChildNodePosition } from '~/utils/flow.utils';

const { screenToFlowCoordinate } = useVueFlow();


const mindmapStore = useMindmap();

mindmapStore.setup();

function addNode() {
    const id = Date.now().toString()
    const newNode: Node = {
        id,
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: `Node ${id}` },
    }

    mindmapStore.addNode(newNode)
}

function connect(connection: Edge) {
    mindmapStore.addEdge(connection);
}

const connectingNodeId = ref('');
function startConnect(event: MouseEvent & OnConnectStartParams) {
    if (!event.nodeId) return;

    connectingNodeId.value = event.nodeId;
}

function endConnect(event: MouseEvent) {
    const parentNode = mindmapStore.getNode(connectingNodeId.value);
    if (!parentNode) return;

    const panePosition = screenToFlowCoordinate({
        x: event.clientX,
        y: event.clientY
    });

    const position = getChildNodePosition(panePosition, parentNode)
    mindmapStore.addChildNode(parentNode, position)
}
</script>

<template>
    <VueFlow
        @nodesChange="mindmapStore.onChanges"
        @edgesChange="mindmapStore.onEdgeChanges"
        @connect="connect"
        v-model:nodes="mindmapStore.nodes"
        v-model:edges="mindmapStore.edges"
        class="flow"
        @connect-end="endConnect"
        @connect-start="startConnect"
    >
        <Background />
        <template #node-custom="props">
            <MindmapNode
                :id="props.id"
                :label="props.data.label"
                @update-label="mindmapStore.updateNodeLabel(props.id, $event)"
            />
        </template>

        <template #edge="props">
            <MindmapEdge :id="props.id" />
        </template>

        <template #connection-line="{ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }">
            <MindmapConnectionLine
                :source-x="sourceX"
                :source-y="sourceY"
                :targetX="targetX"
                :targetY="targetY"
                :source-position="sourcePosition"
                :target-position="targetPosition"
            />
        </template>

        <Panel class="flex gap-5 items-center">
            <Button @click="addNode">Add a node</Button>
            <div class="flex gap-2 items-center">
                <div class="rounded-full size-3" :class="mindmapStore.connected ? 'bg-green-500' : 'bg-red-500'" />
                <p>{{ mindmapStore.connected ? 'Connected' : 'Disconnected' }}</p>
            </div>
        </Panel>
    </VueFlow>
</template>

<style scoped>
.flow {
    height: 100vh;
}
</style>
