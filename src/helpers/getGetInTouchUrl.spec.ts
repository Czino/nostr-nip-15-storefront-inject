import { getGetInTouchUrl } from './getGetInTouchUrl'

describe('getGetInTouchUrl', () => {
    it('should replace placeholders with actual values', () => {
        const url = 'https://example.com/?productid=$PRODUCTID&product=$PRODUCTNAME'
        const productName = 'Test'
        const productId = '1'
        expect(getGetInTouchUrl(url, productId, productName)).toBe('https://example.com/?productid=1&product=Test')
    })
})
