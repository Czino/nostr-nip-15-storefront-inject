export const AddToCartButton = ({ enabled = false }) => (
    <button
        disabled={!enabled}
        className={['w-full bg-highlight-1 p-3 rounded text-xl text-light-1', !enabled ? 'opacity-70' : ''].join(' ')}
    >
        {enabled ? 'Get in touch' : 'Out of stock'}
    </button>
)
