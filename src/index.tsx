import ReactDOM from 'react-dom/client'
import { ProductCarousel } from './components/ProductCarousel'
import { ProductDetail } from './components/ProductDetail'
import { ProductList } from './components/ProductList'
import './index.css'

const $carousels = Array.from(
    document.getElementsByClassName('nostr-product-carousel') as HTMLCollectionOf<HTMLElement>,
)
$carousels.forEach(($carousel) => {
    const root = ReactDOM.createRoot($carousel)
    const pubkey = $carousel.dataset.pubkey
    const imageProxy = $carousel.dataset.imageProxy
    root.render(<ProductCarousel pubkey={pubkey} imageProxy={imageProxy} />)
})
const plps = Array.from(document.getElementsByClassName('nostr-product-list') as HTMLCollectionOf<HTMLElement>)
plps.forEach(($plp) => {
    const root = ReactDOM.createRoot($plp)
    const pubkey = $plp.dataset.pubkey
    const imageProxy = $plp.dataset.imageProxy
    root.render(<ProductList pubkey={pubkey} imageProxy={imageProxy} />)
})
const $pdps = Array.from(document.getElementsByClassName('nostr-product-detail') as HTMLCollectionOf<HTMLElement>)
$pdps.forEach(($pdp) => {
    const root = ReactDOM.createRoot($pdp)
    const id = $pdp.dataset.id
    const imageProxy = $pdp.dataset.imageProxy
    root.render(<ProductDetail id={id} imageProxy={imageProxy} />)
})
