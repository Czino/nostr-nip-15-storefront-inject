import { NDKTag } from '@nostr-dev-kit/ndk'

type Props = { tags: NDKTag[] }

export const TagList = ({ tags }: Props) => (
    <div className="flex flex-row gap-1 flex-wrap">
        {tags
            .filter((t) => t[0] === 't')
            .map(([, tag]) => (
                <a
                    key={tag}
                    className="px-2 py-1 text-xs bg-light-1 text-dark-1 rounded cursor-pointer"
                    href={`/shop?tags=${tag}`}
                >
                    {tag}
                </a>
            ))}
    </div>
)
