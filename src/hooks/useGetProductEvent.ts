import { NDKKind } from '@nostr-dev-kit/ndk'
import { useSubscribe } from 'nostr-hooks'
import { useMemo } from 'react'
import { NIP15Product } from '../types'

export const useGetProductEvent = ({ productId }: { productId: string }) => {
    const filters = useMemo(
        () => [
            {
                kinds: [NDKKind.MarketProduct],
                '#d': [productId],
            },
        ],
        [productId],
    )
    const { events, eose } = useSubscribe({
        filters,
        enabled: !!productId,
        fetchProfiles: false,
    })
    const productInfo = events[0]
    const content: NIP15Product | undefined = productInfo ? JSON.parse(productInfo.content) : undefined
    return { event: productInfo, content, eose }
}
