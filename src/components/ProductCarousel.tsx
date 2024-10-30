import { useNostrHooks } from 'nostr-hooks'
import { useCustomNdk } from '../hooks/useCustomNdk'
import { useGetProductEvents } from '../hooks/useGetProductEvents'
import { Error } from './Error'
import { ProductItem } from './ProductItem'
const DEFAULTS = {
    LIMIT: 8,
}

type Props = {
    pubkey?: string
    showPrice?: boolean
    limit?: number
    imageProxy?: string
}
export const ProductCarousel = ({ pubkey = '', showPrice, limit = DEFAULTS.LIMIT, imageProxy }: Props) => {
    const [customNdk] = useCustomNdk()
    useNostrHooks(customNdk)
    const { productInfos, eose } = useGetProductEvents({ pubkey, limit })
    const availableProducts = productInfos.filter((productInfo) => productInfo?.quantity >= 0)
    if (!pubkey) return <Error>Product Carousel: Missing attribute data-pubkey</Error>

    return (
        <div>
            <div className="relative w-full flex gap-4 snap-x overflow-x-auto">
                {availableProducts.map((productInfo) => (
                    <div
                        key={productInfo.id}
                        className={['snap-center flex-shrink-0 w-3/4 px-4', 'md:w-3/5', 'lg:px-1 lg:w-1/6'].join(' ')}
                    >
                        <ProductItem product={productInfo} showPrice={showPrice} width={340} imageProxy={imageProxy} />
                    </div>
                ))}
            </div>
            {!eose && <div className="text-center">Loading...</div>}
            {eose && availableProducts.length === 0 && <div className="text-center">No products found</div>}
        </div>
    )
}
