import { renderHook } from '@testing-library/react'
import { productEvent, productInfo } from '../../test/data/eventData'
import { mockUseSubscribe } from '../setupTests'
import { useGetProductEvent } from './useGetProductEvent'

describe('useGetProductEvent', () => {
    mockUseSubscribe.mockReturnValue({ events: [productEvent], eose: true })
    it('should return a single product event by id', () => {
        const { result } = renderHook(useGetProductEvent, { initialProps: { productId: productInfo.id } })
        expect(mockUseSubscribe).toHaveBeenCalledWith({
            enabled: true,
            fetchProfiles: false,
            filters: [
                {
                    '#d': ['0f1a3984-7a72-4c6f-b1dc-bc170b6c4d8e'],
                    kinds: [30018],
                },
            ],
        })
        expect(result.current).toEqual({ event: productEvent, content: productInfo, eose: true })
    })
})
