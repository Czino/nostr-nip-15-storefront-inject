import { renderHook } from '@testing-library/react'
import { productEvent, productInfo } from '../../test/data/eventData'
import { mockUseSubscribe } from '../setupTests'
import { useGetProductEvents } from './useGetProductEvents'

describe('useGetProductEvents', () => {
    mockUseSubscribe.mockReturnValue({ events: [productEvent, productEvent], eose: true })
    it('should return a single product event by id', () => {
        const pubkey = 'pubkey'
        const tags = [['#t', 'cat']]
        const limit = 10
        const { result } = renderHook(useGetProductEvents, { initialProps: { pubkey, tags, limit } })
        expect(mockUseSubscribe).toHaveBeenCalledWith({
            enabled: true,
            fetchProfiles: false,
            filters: [
                {
                    '#t': ['cat'],
                    authors: [pubkey],
                    kinds: [30018],
                    limit,
                },
            ],
        })
        expect(result.current).toEqual({
            events: [productEvent, productEvent],
            productInfos: [productInfo, productInfo],
            eose: true,
        })
    })
})
