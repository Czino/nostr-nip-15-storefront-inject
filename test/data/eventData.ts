import { NostrEvent } from '@nostr-dev-kit/ndk'
import { NIP15Product } from '../../src/types'

export const productInfo: NIP15Product = {
    id: '0f1a3984-7a72-4c6f-b1dc-bc170b6c4d8e',
    stall_id: '12b7d956410eb46ac747dd50afc80609228aa765ba001a9784ee28b892d89a4c',
    name: 'Cat Balaclava - Cactus',
    description:
        "Bring a touch of the desert to your home with this quirky cactus balaclava. It's a fun and unique way to keep your cat looking cool and comfy!",
    images: [
        'https://f004.backblazeb2.com/file/plebeian-market/P_listing_BHQQ_media_3041b54d1a0b9de92aa91999214b8848bc6951fe7afb5f9b3ead59d69d03aaf7.jpeg',
        'https://f004.backblazeb2.com/file/plebeian-market/P_listing_BHQQ_media_3041b54d1a0b9de92aa91999214b8848bc6951fe7afb5f9b3ead59d69d03aaf8.jpeg',
    ],
    shipping: [
        { id: 'e595f45dc6c9e7665d108e8ea7940885a42e492918a522d44a1fc35494a4aa48', cost: 0.0 },
        { id: 'WORLD', cost: 0.0 },
    ],
    currency: 'USD',
    price: 21.0,
    quantity: 111,
}

export const productEvent: NostrEvent & { author: { npub: string } } = {
    content: JSON.stringify(productInfo),
    created_at: 1730194439,
    id: '77d1ffc9032d22f1dc7b46760255f7270241b9eec72fa450ad21a74263affa8a',
    kind: 30018,
    pubkey: 'fd511db3de511f07b1de1634ef4e603fb7a51af5b14a7630b8df0f1bd0c705e3',
    sig: '1f882a3039cc5f4107d26a8348c44df1708ad7d59ac1fdd2d7dd8e0af9f8450d6d28e6eadcefec6df0d0e1949d3c1b6a7a758713093c74e3139c46e483ec571f',
    author: {
        npub: 'npub1l4g3mv772y0s0vw7zc6w7nnq87m62xh4k998vv9cmu83h5x8qh3s6eklc5',
    },
    tags: [
        ['d', '0f1a3984-7a72-4c6f-b1dc-bc170b6c4d8e'],
        ['t', 'cat'],
    ],
}
