import { useNostrHooks } from 'nostr-hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GLOBAL_DEFAULTS } from '../constants'
import { elementAboveViewPortBottom } from '../helpers/elementAboveViewPortBottom'
import { extractProductIdFromUrl } from '../helpers/extractProductIdFromUrl'
import { getGetInTouchUrl } from '../helpers/getGetInTouchUrl'
import { useCustomNdk } from '../hooks/useCustomNdk'
import { useGetProductEvent } from '../hooks/useGetProductEvent'
import { ShippingInfo } from '../types'
import { AddToCartButtons } from './AddToCartButtons'
import { Error } from './Error'
import { LoadingAnimation } from './icons/LoadingAnimation'
import { ImageSlider } from './ImageSlider'
import { TagList } from './TagList'

type PriceProps = {
    price: number
    currency: string
    showPrice?: boolean
    priceInfo?: string
}
const Price = ({ price, currency, showPrice, priceInfo }: PriceProps) => {
    if (!showPrice && !priceInfo) return <></>
    let displayPrice = currency + price
    if (priceInfo) displayPrice = `${priceInfo}: ${displayPrice}`
    return <div className="text-xl italic">{showPrice ? displayPrice : priceInfo}</div>
}

type Props = {
    id?: string
    productUrl?: string
    addToCartUrl?: string
    showPrice?: boolean
    priceInfo?: string
    relays?: string
}
const DEFAULTS = {
    PLACEHOLDER_TAGS: [
        ['t', '   '],
        ['t', '      '],
        ['t', '    '],
        ['t', '     '],
    ],
    PRODUCTURL: GLOBAL_DEFAULTS.PRODUCTURL,
}
export const ProductDetail = ({
    id = '',
    productUrl = DEFAULTS.PRODUCTURL,
    showPrice,
    priceInfo,
    addToCartUrl,
    relays = '',
}: Props) => {
    const [customNdk] = useCustomNdk({ relays: relays ? relays.split(',') : undefined })
    const productId = id || extractProductIdFromUrl(window.location.href, productUrl) || ''
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

    const { event, content, eose } = useGetProductEvent({ productId })
    if (!productId) return <Error>Product Detail: Missing attribute data-id</Error>
    const isLoading = !event || !content
    const getInTouchUrl =
        addToCartUrl && content ? getGetInTouchUrl(addToCartUrl, content?.id, content.name) : undefined
    return (
        <div className="flex justify-center">
            <div className="max-w-[1600px] w-full">
                <div className="grid gap-4 items-start lg:grid-cols-2">
                    <div className="relative w-full aspect-[3/4]">
                        <div className="flex absolute inset-0 justify-center items-center">
                            <LoadingAnimation />
                        </div>
                        <div className="relative z-1">{!isLoading && <ImageSlider images={content.images} />}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 p-4 lg:p-0">
                        {!isLoading ? (
                            <h1 className="text-4xl">{content.name}</h1>
                        ) : (
                            <div className="w-1/2 text-4xl rounded-full animate-pulse bg-light-1"> </div>
                        )}
                        <div className="grid grid-cols-1 gap-2">
                            {!isLoading ? (
                                <>
                                    <Price
                                        price={content.price}
                                        currency={content.currency}
                                        showPrice={showPrice}
                                        priceInfo={priceInfo}
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">Shipping</h2>
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
                                    <div className="w-1/3 text-xl rounded-full animate-pulse bg-light-1"> </div>
                                    <div className="grid grid-cols-1 gap-1 w-1/4">
                                        <div className="text-xl rounded-full animate-pulse bg-light-1"></div>
                                        <div className="rounded-full animate-pulse bg-light-1"> </div>
                                        <div className="rounded-full animate-pulse bg-light-1"> </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {!isLoading ? (
                            <div>{content.description}</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-1">
                                <div className="rounded-full animate-pulse bg-light-1"> </div>
                                <div className="rounded-full animate-pulse bg-light-1"> </div>
                                <div className="rounded-full animate-pulse bg-light-1"> </div>
                            </div>
                        )}
                        {!isLoading ? (
                            <TagList tags={event.tags} />
                        ) : (
                            <div className="animate-pulse">
                                <TagList tags={DEFAULTS.PLACEHOLDER_TAGS} />
                            </div>
                        )}
                        <div ref={ctaRef}>
                            {!!content && (
                                <AddToCartButtons
                                    productId={content.id}
                                    npub={event?.author.npub}
                                    url={getInTouchUrl}
                                    enabled={!!content.quantity}
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className={[
                            'grid lg:hidden bottom-0 left-0 right-0 p-4 bg-dark-2 shadow-all',
                            showFixedCTA ? 'fixed' : 'hidden',
                        ].join(' ')}
                    >
                        {content && (
                            <AddToCartButtons
                                enabled={!!content.quantity}
                                productId={content.id}
                                npub={event?.author.npub}
                                url={getInTouchUrl}
                            />
                        )}
                    </div>
                </div>
                {!eose && <div>Loading...</div>}
            </div>
        </div>
    )
}
