import { useNostrHooks } from 'nostr-hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { elementAboveViewPortBottom } from '../helpers/elementAboveViewPortBottom'
import { useCustomNdk } from '../hooks/useCustomNdk'
import { useGetProductEvent } from '../hooks/useGetProductEvent'
import { AddToCartButton } from './AddToCartButton'
import { Error } from './Error'
import { LoadingAnimation } from './icons/LoadingAnimation'
import { ImageSlider } from './ImageSlider'
import { TagList } from './TagList'
import { ShippingInfo } from './types'

type Props = {
    id?: string
    imageProxy?: string
}
export const ProductDetail = ({ id = '' }: Props) => {
    const [customNdk] = useCustomNdk()
    const productId = id || window.location.pathname.replace(/\/$/u, '').split('/').pop() || ''
    useNostrHooks(customNdk)
    const ctaRef = useRef<HTMLDivElement>(null)
    const [showFixedCTA, setShowFixedCTA] = useState(true)

    const handleScroll = useCallback(() => {
        if (!ctaRef.current) return
        if (showFixedCTA && elementAboveViewPortBottom(ctaRef.current)) setShowFixedCTA(false)
        if (!showFixedCTA && !elementAboveViewPortBottom(ctaRef.current)) setShowFixedCTA(true)
    }, [showFixedCTA])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    const { productInfo, content, eose } = useGetProductEvent({ productId })
    if (!productId) return <Error>Product Detail: Missing attribute data-id</Error>
    const isLoading = !productInfo || !content

    return (
        <div className="flex justify-center">
            <div className="max-w-[1600px] w-full">
                <div className="grid lg:grid-cols-2 gap-4 items-start">
                    <div className="relative w-full aspect-[3/4]">
                        <div className="absolute inset-0 flex justify-center items-center">
                            <LoadingAnimation />
                        </div>
                        <div className="relative z-1">{!isLoading && <ImageSlider images={content.images} />}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 p-4 lg:p-0">
                        {!isLoading ? (
                            <h1 className="text-4xl">{content.name}</h1>
                        ) : (
                            <div className="animate-pulse bg-light-1 w-1/2 rounded-full text-4xl"> </div>
                        )}
                        <div className="grid grid-cols-1 gap-2">
                            {!isLoading ? (
                                <>
                                    <div className="text-xl italic">Name your price</div>
                                    <div>
                                        <h2 className="font-bold text-xl">Shipping</h2>
                                        {content.shipping
                                            .sort((a: ShippingInfo, b: ShippingInfo) => a.cost - b.cost)
                                            .map((shipping) => (
                                                <div key={shipping.id} className="capitalize">
                                                    {(shipping.id || 'National').toLowerCase()}: {content.currency}
                                                    {shipping.cost}
                                                </div>
                                            ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-1/3 animate-pulse text-xl rounded-full bg-light-1"> </div>
                                    <div className="w-1/4 grid grid-cols-1 gap-1">
                                        <div className="animate-pulse text-xl rounded-full bg-light-1 "></div>
                                        <div className="animate-pulse rounded-full bg-light-1"> </div>
                                        <div className="animate-pulse rounded-full bg-light-1"> </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {!isLoading ? (
                            <div>{content.description}</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-1">
                                <div className="animate-pulse rounded-full bg-light-1"> </div>
                                <div className="animate-pulse rounded-full bg-light-1"> </div>
                                <div className="animate-pulse rounded-full bg-light-1"> </div>
                            </div>
                        )}
                        {!isLoading ? (
                            <TagList tags={productInfo.tags} />
                        ) : (
                            <div className="animate-pulse">
                                <TagList tags={Array(4).fill(['t', '      '])} />
                            </div>
                        )}
                        <div ref={ctaRef}>
                            <AddToCartButton enabled={!!content?.quantity} />
                        </div>
                    </div>
                    <div
                        className={[
                            'grid lg:hidden bottom-0 left-0 right-0 p-4 bg-dark-2 shadow-all',
                            showFixedCTA ? 'fixed' : 'hidden',
                        ].join(' ')}
                    >
                        <AddToCartButton enabled={!!content?.quantity} />
                    </div>
                </div>
                {!eose && <div>Loading...</div>}
            </div>
        </div>
    )
}
