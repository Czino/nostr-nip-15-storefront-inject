import { render } from '@testing-library/react'
import { productEvent } from '../../test/data/eventData'
import { mockUseSubscribe } from '../setupTests'
import { ProductCarousel } from './ProductCarousel'

describe('ProductCarousel', () => {
    let base: DocumentFragment
    it('renders error when no pubkey is passed', () => {
        mockUseSubscribe.mockReturnValue({ events: [], eose: false })
        const { asFragment } = render(<ProductCarousel />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('renders product carousel correctly', () => {
        mockUseSubscribe.mockReturnValue({ events: [productEvent], eose: true })

        base = render(<ProductCarousel pubkey="pubkey" />).asFragment()
        expect(base).toMatchSnapshot()
    })
    it('renders product carousel correctly without price', () => {
        mockUseSubscribe.mockReturnValue({ events: [productEvent], eose: true })

        const { asFragment } = render(<ProductCarousel pubkey="pubkey" showPrice="false" />)
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
})
