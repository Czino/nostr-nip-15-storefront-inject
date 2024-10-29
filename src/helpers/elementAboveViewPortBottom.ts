export const elementAboveViewPortBottom = ($element: HTMLElement) => {
    const rect = $element.getBoundingClientRect()

    return rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
}
