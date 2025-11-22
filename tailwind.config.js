/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'raga-primary': '#FF9933', // Saffron
                'raga-secondary': '#138808', // India Green
                'raga-dark': '#1a1a1a',
                'raga-light': '#f5f5f5',
                'mood-calm': '#A8D0E6',
                'mood-joy': '#F8E9A1',
                'mood-sad': '#374785',
                'mood-stress': '#F76C6C',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
