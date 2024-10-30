import { render } from '@testing-library/react'
import { productEvent, productInfo } from '../../test/data/eventData'
import { mockUseSubscribe } from '../setupTests'
import { ProductDetail } from './ProductDetail'

describe('ProductDetail', () => {
    it('renders error when no product id is passed', () => {
        mockUseSubscribe.mockReturnValue({ events: [], eose: false })
        const { asFragment } = render(<ProductDetail id="" />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('renders product detail with placeholders correctly', () => {
        mockUseSubscribe.mockReturnValue({ events: [], eose: false })

        const { asFragment } = render(<ProductDetail id={productInfo.id} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('renders product detail correctly', () => {
        mockUseSubscribe.mockReturnValue({ events: [productEvent], eose: true })

        const { asFragment } = render(<ProductDetail id={productInfo.id} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
