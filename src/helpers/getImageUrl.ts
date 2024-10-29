export const getImageUrl = (url: string, width: number, imageProxy?: string): string =>
    imageProxy ? imageProxy.replace('$URL', url).replace('$WIDTH', String(width)) : url
