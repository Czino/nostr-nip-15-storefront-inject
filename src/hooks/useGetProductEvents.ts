import { NDKKind, NDKTag } from '@nostr-dev-kit/ndk'
import { useSubscribe } from 'nostr-hooks'
import { useMemo } from 'react'
import { NIP15Product } from '../types'

type Props = {
    pubkey: string
    tags?: NDKTag[]
    limit?: number
}
export const useGetProductEvents = ({ pubkey, tags, limit }: Props) => {
    const filters = useMemo(
        () =>
            tags
                ? [{ kinds: [NDKKind.MarketProduct], authors: [pubkey], limit, '#t': tags.map(([, tag]) => tag) }]
                : [{ kinds: [NDKKind.MarketProduct], authors: [pubkey], limit }],
        [limit, pubkey, tags],
    )
    const { events, eose } = useSubscribe({
        filters,
        enabled: !!pubkey,
        fetchProfiles: false,
    })
    return {
        events,
        productInfos: events.map((event) => {
            const content: NIP15Product = JSON.parse(event.content)
            return content
        }),
        eose,
    }
}
