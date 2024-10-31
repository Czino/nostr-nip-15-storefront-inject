import { render } from '@testing-library/react'
import { AddToCartButtons } from './AddToCartButtons'

describe('AddToCartButtons', () => {
    const npub = 'npub'
    const productId = 'productId'
    it('renders correctly when disabled', () => {
        const { asFragment } = render(<AddToCartButtons npub={npub} productId={productId} enabled={false} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('renders correctly when enabled', () => {
        const { asFragment } = render(<AddToCartButtons npub={npub} productId={productId} enabled={true} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
