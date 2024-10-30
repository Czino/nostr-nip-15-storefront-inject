const config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './public/*.html'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                highlight: {
                    1: '#ea9538',
                    2: '#e88c2a',
                },
                dark: {
                    1: '#282826',
                    2: '#1d1d1b',
                    transparent: '#28282690',
                },
                light: {
                    1: '#F2F2F2',
                },
                info: '#a0d2dd',
            },
            boxShadow: {
                all: '0 0 20px 10px rgba(0, 0, 0, 0.3)',
            },
            zIndex: {
                '-1': '-1',
                1: '1',
            },
        },
    },
    plugins: [],
}
export default config
