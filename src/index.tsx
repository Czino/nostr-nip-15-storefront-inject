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
    root.render(<ProductCarousel {...$carousel.dataset} />)
})
const plps = Array.from(document.getElementsByClassName('nostr-product-list') as HTMLCollectionOf<HTMLElement>)
plps.forEach(($plp) => {
    const root = ReactDOM.createRoot($plp)
    root.render(<ProductList {...$plp.dataset} />)
})
const $pdps = Array.from(document.getElementsByClassName('nostr-product-detail') as HTMLCollectionOf<HTMLElement>)
$pdps.forEach(($pdp) => {
    const root = ReactDOM.createRoot($pdp)
    root.render(<ProductDetail {...$pdp.dataset} />)
})
