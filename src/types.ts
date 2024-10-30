export type ShippingInfo = {
    id: string
    cost: number
}
export type NIP15Product = {
    id: string
    stall_id: string
    name: string
    description: string
    images: string[]
    currency: string
    price: number
    quantity: number
    specs?: string[][]
    shipping: ShippingInfo[]
}
