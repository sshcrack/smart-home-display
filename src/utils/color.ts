export function paletteColorToCss(hue: number, saturation: number, local_lightness: number, alpha = 1) {
    return `hsla(${hue * 360}deg  ${saturation * 100}% ${local_lightness * 100}% / ${alpha * 100}%)`
}