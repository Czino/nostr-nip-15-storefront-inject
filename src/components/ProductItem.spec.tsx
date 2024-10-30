import { render } from '@testing-library/react'
import { productInfo } from '../../test/data/eventData'
import { imageProxy } from '../../test/data/testData'
import { ProductItem } from './ProductItem'

describe('ProductItem', () => {
    const base = render(<ProductItem product={productInfo} />).asFragment()
    it('renders product item correctly', () => {
        expect(base).toMatchSnapshot()
    })
    it('renders product item correctly with custom width', () => {
        const { asFragment } = render(<ProductItem product={productInfo} width={400} />)
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
    it('renders product item correctly with image proxy', () => {
        const { asFragment } = render(<ProductItem product={productInfo} imageProxy={imageProxy} />)
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
})
