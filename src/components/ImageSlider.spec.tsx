import { render } from '@testing-library/react'
import { productInfo } from '../../test/data/eventData'
import { ImageSlider } from './ImageSlider'

describe('ImageSlider', () => {
    it('renders images correctly', () => {
        const { asFragment } = render(<ImageSlider images={productInfo.images} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
