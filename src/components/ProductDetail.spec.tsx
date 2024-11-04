import { render } from '@testing-library/react'
import { productEvent, productInfo } from '../../test/data/eventData'
import { mockUseSubscribe } from '../setupTests'
import { ProductDetail } from './ProductDetail'

describe('ProductDetail', () => {
    let base: DocumentFragment
    it('renders error when no product id is passed', () => {
        mockUseSubscribe.mockReturnValueOnce({ events: [], eose: false })
        const { asFragment } = render(<ProductDetail id="" />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('renders product detail with placeholders correctly', () => {
        mockUseSubscribe.mockReturnValueOnce({ events: [], eose: false })
        const { asFragment } = render(<ProductDetail id={productInfo.id} />)
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
    it('renders product detail correctly', () => {
        mockUseSubscribe.mockReturnValueOnce({ events: [productEvent], eose: true })
        base = render(<ProductDetail id={productInfo.id} />).asFragment()
        expect(base).toMatchSnapshot()
    })
    it('renders product detail without price', () => {
        mockUseSubscribe.mockReturnValueOnce({ events: [productEvent], eose: true })
        const { asFragment } = render(<ProductDetail id={productInfo.id} showPrice={false} />)
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
})
