export const failure = (error: string) => ({
    type: 'ERROR',
    payload: { error }
});

export const colorSet = (color: string) => ({
    type: 'COLOR_SET',
    payload: { color }
})

export const addCanvasDataURL = (canvasDataURL: string) => ({
    type: 'CANVAS_DATAURL',
    payload: { canvasDataURL }
})
