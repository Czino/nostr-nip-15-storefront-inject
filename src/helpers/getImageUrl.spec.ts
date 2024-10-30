import { imageProxy } from '../../test/data/testData'
import { getImageUrl } from './getImageUrl'

describe('getImageUrl', () => {
    it('should replace placeholders with actual values', () => {
        const width = 400
        const imageUrl = 'https://image.com/abc.jpg'
        expect(getImageUrl(imageUrl, width, imageProxy)).toBe('https://domain.com/?url=https://image.com/abc.jpg&w=400')
    })
})
