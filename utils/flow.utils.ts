import type { Node, XYPosition } from '@vue-flow/core'

export function getChildNodePosition(panePosition: XYPosition, parentNode: Node) {
    return {
        x: panePosition.x - parentNode.computedPosition.x,
        y: panePosition.y - parentNode.computedPosition.y
    }
}
