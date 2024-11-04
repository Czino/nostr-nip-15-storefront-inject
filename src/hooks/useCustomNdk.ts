import NDK from '@nostr-dev-kit/ndk'
import { useEffect, useState } from 'react'
import { DEFAULT_RELAYS } from '../constants'

type Props = {
    relays?: string[]
}
export const useCustomNdk = ({ relays = [] }: Props) => {
    const [customNdk, setCustomNdk] = useState<NDK>(
        new NDK({ explicitRelayUrls: relays.length ? relays : DEFAULT_RELAYS }),
    )

    useEffect(() => {
        customNdk.connect()
    }, [customNdk])

    return [customNdk, setCustomNdk] as const
}
