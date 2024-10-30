# NIP-15 Storefront inject

Check out the [Demo Storefront here](https://czino.github.io/nostr-nip-15-storefront-inject)
## How to use

1. Install
```
npm install
```
2. Build
```
npm run build
```
3. Copy assets if needed from
`build/static`

## Concept
When the Javascript is included it will execute after page load and look for HTML elements with the following classes:

- `.nostr-product-list`
- `.nostr-product-carousel`
- `.nostr-product-detail`

Each HTML element will need either the stall pubkey or the product id to function. The attribute to add is `data-pubkey` or `data-id`

### Example Product Listing
```html
<div class="nostr-product-list" data-pubkey="fd511db3de511f07b1de1634ef4e603fb7a51af5b14a7630b8df0f1bd0c705e3"></div>
```

## Options
- `data-show-price`: if set to `true`, then prices will be shown on product items

### Example Product Detail
```html
<div class="nostr-product-detail" data-id="0f1a3984-7a72-4c6f-b1dc-bc170b6c4d8e"></div>
```

## Dynamic Product URLs
Because each website can have a different URL pattern for product pages you can define a custom product URL The pattern is the following:

`data-product-url="https://example.com/path/to/$PRODUCTNAME/$PRODUCTID"`

This will instruct the app to link to product detail pages respecting the pattern

- `$PRODUCTID`: will be automatically replaced with the product it
- `$PRODUCTNAME`: will be automatically replaced with the url encoded product name

## Dynamic Image URLs
Because product images are often uploaded in one size and served as one size, you can define a custom image URL proxy to serve images in any size. The pattern is the following:

`data-image-proxy="https://example.com/path/to/proxy?url=$URL&sw=$WIDTH"`

This will instruct the app to load images through the proxy and pass necessary parameters to it:

- `$URL`: will be automatically replaced with the image URL to load
- `$WIDTH`: will be automatically replaced with the width defined in the component

## Todo
- [ ] make show/hide out of stock products configurable
