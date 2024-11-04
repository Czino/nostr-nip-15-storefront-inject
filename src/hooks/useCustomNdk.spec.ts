import { renderHook } from '@testing-library/react'
import { DEFAULT_RELAYS } from '../constants'
import { useCustomNdk } from './useCustomNdk'

describe('useCustomNdk', () => {
    it('should return a custom NDK and setter', () => {
        const { result } = renderHook(useCustomNdk, { initialProps: { relays: undefined } })
        const [customNdk, setCustomNdk] = result.current
        expect(customNdk.explicitRelayUrls).toEqual(DEFAULT_RELAYS)
        expect(setCustomNdk).toBeInstanceOf(Function)
    })
    it('should call custom NDK with passed relays', () => {
        const relays = ['relay1']
        const { result } = renderHook(useCustomNdk, { initialProps: { relays } })
        const [customNdk] = result.current
        expect(customNdk.explicitRelayUrls).toEqual(relays)
    })
})
