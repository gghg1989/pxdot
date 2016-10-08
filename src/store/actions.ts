export const failure = (error: string) => ({
    type: 'ERROR',
    payload: { error }
});