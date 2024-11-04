import { render } from '@testing-library/react'
import { productEvent } from '../../test/data/eventData'
import { mockUseSubscribe } from '../setupTests'
import { ProductList } from './ProductList'

describe('ProductList', () => {
    let base: DocumentFragment
    it('renders error when no pubkey is passed', () => {
        mockUseSubscribe.mockReturnValue({ events: [], eose: false })
        const { asFragment } = render(<ProductList />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('renders product list correctly', () => {
        mockUseSubscribe.mockReturnValue({ events: [productEvent], eose: true })

        base = render(<ProductList pubkey="pubkey" />).asFragment()
        expect(base).toMatchSnapshot()
    })
    it('renders product carousel correctly without price', () => {
        mockUseSubscribe.mockReturnValue({ events: [productEvent], eose: true })

        const { asFragment } = render(<ProductList pubkey="pubkey" showPrice={false} />)
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
})
