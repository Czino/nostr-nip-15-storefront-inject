import { getTagsFromUrl } from './getTagsFromUrl'

describe('getTagsFromUrl', () => {
    it('returns all tags from url parameters', () => {
        expect(getTagsFromUrl('https://domain.com/search?tags=cat,balaclava')).toEqual([
            ['#t', 'cat'],
            ['#t', 'balaclava'],
        ])
    })
})
