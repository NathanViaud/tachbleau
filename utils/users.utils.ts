export function nameToColor(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = hash % 360;
    const saturation = 90;
    const lightness = 75;
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
