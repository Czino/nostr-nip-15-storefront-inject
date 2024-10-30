import { NDKTag } from '@nostr-dev-kit/ndk'
import { useNostrHooks } from 'nostr-hooks'
import { useState } from 'react'
import { getTagsFromUrl } from '../helpers/getTagsFromUrl'
import { useCustomNdk } from '../hooks/useCustomNdk'
import { useGetProductEvents } from '../hooks/useGetProductEvents'
import { Error } from './Error'
import { ProductItem } from './ProductItem'

type Props = {
    pubkey?: string
    tags?: NDKTag[]
    imageProxy?: string
    showPrice?: boolean
}
export const ProductList = ({ pubkey = '', tags, imageProxy, showPrice }: Props) => {
    const [customNdk] = useCustomNdk()
    const [searchTags] = useState(tags || getTagsFromUrl(window.location.href))

    useNostrHooks(customNdk)
    const { productInfos, eose } = useGetProductEvents({ pubkey, tags: searchTags })
    const availableProducts = productInfos.filter((productInfo) => productInfo?.quantity >= 0)
    if (!pubkey) return <Error>Product List: Missing attribute data-pubkey</Error>

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableProducts.map((productInfo) => (
                    <ProductItem
                        key={productInfo.id}
                        product={productInfo}
                        width={400}
                        showPrice={showPrice}
                        imageProxy={imageProxy}
                    />
                ))}
            </div>
            {!eose && <div className="text-center">Loading...</div>}
            {eose && availableProducts.length === 0 && <div className="text-center">No products found</div>}
        </div>
    )
}
