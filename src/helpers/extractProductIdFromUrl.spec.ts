import { extractProductIdFromUrl } from './extractProductIdFromUrl'

describe('extractProductIdFromUrl', () => {
    it('should get product id based on pattern and url', () => {
        const productId = '0f1a3984-7a72-4c6f-b1dc-bc170b6c4d8e'
        const productName = 'Cat%20Balaclava%20-%20Cactus'
        expect(
            extractProductIdFromUrl(
                `https://czino.github.io/nostr-nip-15-storefront-inject/product/${productName}/${productId}`,
                '/product/$PRODUCTNAME/$PRODUCTID',
            ),
        ).toBe(productId)
        expect(
            extractProductIdFromUrl(
                `https://czino.github.io/nostr-nip-15-storefront-inject/?product=${productId}`,
                'https://czino.github.io/nostr-nip-15-storefront-inject/?product=$PRODUCTID',
            ),
        ).toBe(productId)
        expect(
            extractProductIdFromUrl(
                `https://czino.github.io/nostr-nip-15-storefront-inject/product/${productId}/${productName}`,
                '/product/$PRODUCTID/$PRODUCTNAME',
            ),
        ).toBe(productId)
        expect(
            extractProductIdFromUrl(
                `https://czino.github.io/nostr-nip-15-storefront-inject?product=${productId}`,
                '?product=$PRODUCTID',
            ),
        ).toBe(productId)
        expect(extractProductIdFromUrl(`http://localhost:3000/?product=${productId}`, '/?product=$PRODUCTID')).toBe(
            productId,
        )
    })
    it('return undefined if product id could not be determined', () => {
        const productName = 'Cat%20Balaclava%20-%20Cactus'
        expect(
            extractProductIdFromUrl(
                `https://czino.github.io/nostr-nip-15-storefront-inject/product/${productName}`,
                '/product/$PRODUCTNAME/$PRODUCTID',
            ),
        ).toBeUndefined()
        expect(
            extractProductIdFromUrl(
                `https://czino.github.io/nostr-nip-15-storefront-inject/product/${productName}`,
                '/product/$PRODUCTID/$PRODUCTNAME',
            ),
        ).toBeUndefined()
        expect(
            extractProductIdFromUrl('https://czino.github.io/nostr-nip-15-storefront-inject', '?product=$PRODUCTID'),
        ).toBeUndefined()
    })
})
