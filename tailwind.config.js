/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                white: "#ffffff",
                cream: {
                    50: "#FFFDF7",
                    100: "#FFF9E6",
                    200: "#FFF3CC",
                    300: "#FFEDB3",
                    400: "#FFE799",
                    500: "#FFE180",
                    600: "#D8B54C",
                    700: "#A38728",
                    800: "#6D5A14",
                    900: "#382D0A"
                },
                gray: {
                    50: "#f9fafb",
                    200: "#e5e7eb",
                    500: "#6b7280",
                    700: "#374151"
                },
                primary: {
                    DEFAULT: "#D8B54C",
                    dark: "#A38728"
                },
                secondary: "#8D7B4C",
                text: {
                    DEFAULT: "#4B3F26",
                    light: "#6D5A14"
                },
                blue: {
                    50: "#eff6ff"
                }
            },
            borderRadius: {
                'lg': '1rem',
                'xl': '1.5rem',
                '2xl': '2rem',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
} 