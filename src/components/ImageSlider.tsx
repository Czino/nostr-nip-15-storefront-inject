import { useEffect, useRef, useState } from 'react'
import { ArrowNext } from './icons/ArrowNext'
import { ArrowPrev } from './icons/ArrowPrev'

const buttonClasses = [
    'w-12 h-12 flex justify-center items-center bg-transparent rounded-full text-dark-1 pe-auto',
    'backdrop-blur-md backdrop-brightness-110',
].join(' ')
export const ImageSlider = ({ images }: { images: string[] }) => {
    const sliderRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const handleScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
        }
    }

    const scrollLeft = () => {
        if (!sliderRef.current) return
        sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: 'smooth' })
    }

    const scrollRight = () => {
        if (!sliderRef.current) return
        sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' })
    }

    useEffect(() => {
        const currentSlider = sliderRef.current
        currentSlider?.addEventListener('scroll', handleScroll)
        return () => {
            currentSlider?.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="relative">
            <div className="relative overflow-x-auto snap-x snap-mandatory" ref={sliderRef}>
                <div className="flex space-x-4">
                    {images.map((url) => (
                        <div key={url} className="snap-start flex-shrink-0 w-full">
                            <img src={url} alt="" className="w-full h-auto" />
                        </div>
                    ))}
                </div>
            </div>
            {images.length > 1 && (
                <>
                    <div className="absolute inset-0 flex justify-between items-center p-4 pe-none">
                        <button
                            disabled={!canScrollLeft}
                            onClick={scrollLeft}
                            className={[buttonClasses, !canScrollLeft ? 'opacity-30' : ''].join(' ')}
                        >
                            <ArrowPrev />
                        </button>
                        <button
                            disabled={!canScrollRight}
                            onClick={scrollRight}
                            className={[buttonClasses, !canScrollRight ? 'opacity-30' : ''].join(' ')}
                        >
                            <ArrowNext />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
