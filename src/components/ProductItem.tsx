import { getImageUrl } from '../helpers/getImageUrl'
import { NIP15Product } from '../types'
import { LoadingAnimation } from './icons/LoadingAnimation'

const DEFAULTS = {
    WIDTH: 340,
}
type Props = { product: NIP15Product; width?: number; imageProxy?: string }
export const ProductItem = ({ product, width = DEFAULTS.WIDTH, imageProxy }: Props) => (
    <a href={`/product/${encodeURI(product.name)}/${product.id}`} className="grid grid-cols-1 gap-1">
        <div className="w-full relative aspect-[2/3] overflow-hidden">
            <div className="absolute inset-0 flex justify-center items-center -z-1">
                <LoadingAnimation />
            </div>
            <img
                src={getImageUrl(product.images[0], width, imageProxy)}
                width={width}
                className="w-full h-full object-cover"
                alt=""
            />
            {!!product.images[1] && (
                <img
                    src={getImageUrl(product.images[1], width, imageProxy)}
                    width={width}
                    className={[
                        'object-cover w-full h-full absolute top-0',
                        'opacity-0 hover:opacity-100 transition-opacity duration-500',
                    ].join(' ')}
                    alt=""
                />
            )}
        </div>
        <div className="px-2">
            <h3 className="text-xl font-bold">{product.name}</h3>
        </div>
    </a>
)
