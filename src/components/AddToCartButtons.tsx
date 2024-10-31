import { MailIcon } from './icons/MailIcon'
import { NostrLogo } from './icons/NostrLogo'
import { PlebeianMarketLogo } from './icons/PlebeianMarketLogo'

type Props = {
    productId: string
    npub: string
    url?: string
    enabled?: boolean
}

const buttonClassName =
    'flex justify-center w-full bg-dark-2 border border-highlight-1 p-3 rounded text-xl text-light-1'
export const AddToCartButtons = ({ productId, npub, url, enabled = false }: Props) => {
    if (!enabled) return <h3>Out of stock</h3>
    return (
        <div className="grid grid-cols-1 gap-2">
            <h3 className="text-xl">Get in touch:</h3>
            <div className="grid grid-cols-3 gap-2">
                <a href={`https://njump.me/${npub}`} className={buttonClassName}>
                    <NostrLogo className="h-10" />
                </a>
                <a href={`https://plebeian.market/product/${productId}`} className={buttonClassName}>
                    <PlebeianMarketLogo className="h-10 text-light-1 fill-light-1" />
                </a>
                {!!url && (
                    <a href={url} className={buttonClassName}>
                        <MailIcon className="h-10 stroke-light-1" />
                    </a>
                )}
            </div>
        </div>
    )
}
