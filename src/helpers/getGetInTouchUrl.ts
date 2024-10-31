export const getGetInTouchUrl = (url: string, productId: string, productName?: string): string =>
    url.replace('$PRODUCTID', productId).replace('$PRODUCTNAME', productName || '')
