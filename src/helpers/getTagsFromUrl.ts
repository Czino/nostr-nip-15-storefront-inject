import { NDKTag } from '@nostr-dev-kit/ndk'

export const getTagsFromUrl = (url: string): NDKTag[] | undefined => {
    const urlObj = new URL(url)

    const tagsParam = urlObj.searchParams.get('tags')

    if (tagsParam) {
        return tagsParam
            .split(',')
            .map((tag) => tag.trim())
            .map((tag) => ['#t', tag])
    }

    return undefined
}
