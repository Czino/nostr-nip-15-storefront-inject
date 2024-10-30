import { render } from '@testing-library/react'
import { Error } from './Error'

describe('Error', () => {
    it('renders correctly', () => {
        const { asFragment } = render(<Error>Oops</Error>)
        expect(asFragment()).toMatchSnapshot()
    })
})
