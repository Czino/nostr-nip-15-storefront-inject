import { render } from '@testing-library/react'
import { TagList } from './TagList'

describe('TagList', () => {
    it('renders tags correctly', () => {
        const { asFragment } = render(
            <TagList
                tags={[
                    ['t', 'cat'],
                    ['t', 'balaclava'],
                    ['s', 'unrelated tag'],
                ]}
            />,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
