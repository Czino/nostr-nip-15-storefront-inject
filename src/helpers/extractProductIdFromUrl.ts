export const extractProductIdFromUrl = (url: string, pattern: string) => {
    const regexPattern = pattern
        .replace(/\$/gu, '\\$')
        .replace(/\./gu, '\\.')
        .replace(/\//gu, '\\/')
        .replace(/\?/gu, '\\?')
        .replace(/\\\$PRODUCTNAME/gu, '([^/=&]+)')
        .replace(/\\\$PRODUCTID/gu, '(?<productId>[a-zA-Z0-9-]+)')

    const regex = new RegExp(regexPattern, 'u')
    const { productId } = regex.exec(url)?.groups || { productId: undefined }

    return productId
}
