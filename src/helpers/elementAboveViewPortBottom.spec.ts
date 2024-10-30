import { elementAboveViewPortBottom } from './elementAboveViewPortBottom'

describe('elementAboveViewPortBottom', () => {
    let element: HTMLDivElement
    const boundingClientRect = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        height: 1,
        width: 1,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
    }
    window.innerHeight = 600

    beforeEach(() => {
        element = document.createElement('div')
        document.body.appendChild(element)
    })
    afterEach(() => {
        document.body.removeChild(element)
    })
    it('should return true if the element is above the viewport bottom', () => {
        element.getBoundingClientRect = jest.fn(() => ({
            ...boundingClientRect,
            bottom: 599,
        }))
        expect(elementAboveViewPortBottom(element)).toBe(true)
    })
    it('should return false if the element is below the viewport bottom', () => {
        element.getBoundingClientRect = jest.fn(() => ({
            ...boundingClientRect,
            bottom: 601,
        }))
        expect(elementAboveViewPortBottom(element)).toBe(false)
    })
    it('should return true if the element is exactly at the viewport bottom', () => {
        element.getBoundingClientRect = jest.fn(() => ({
            ...boundingClientRect,
            bottom: 600,
        }))
        expect(elementAboveViewPortBottom(element)).toBe(true)
    })
})
