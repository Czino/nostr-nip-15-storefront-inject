import { render } from '@testing-library/react'
import { AddToCartButton } from './AddToCartButton'

describe('AddToCartButton', () => {
    it('renders correctly when disabled', () => {
        const { asFragment } = render(<AddToCartButton enabled={false} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('renders correctly when enabled', () => {
        const { asFragment } = render(<AddToCartButton enabled={true} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
