import { render } from '@testing-library/react'
import { productEvent } from '../../test/data/eventData'
import { mockUseSubscribe } from '../setupTests'
import { ProductCarousel } from './ProductCarousel'

describe('ProductCarousel', () => {
    it('renders error when no pubkey is passed', () => {
        mockUseSubscribe.mockReturnValue({ events: [], eose: false })
        const { asFragment } = render(<ProductCarousel />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('renders product carousel correctly', () => {
        mockUseSubscribe.mockReturnValue({ events: [productEvent], eose: true })

        const { asFragment } = render(<ProductCarousel pubkey="pubkey" />)
        expect(asFragment()).toMatchSnapshot()
    })
})
