import {
    createSystem,
    defaultConfig,
    defineConfig,
  } from "@chakra-ui/react"


const config = defineConfig({
    conditions: {
        dark: ":where([data-theme=dark], .dark)",
    },
    globalCss: {
        "html, body, #root": {
            height: "100%",
        },
        body: {
            bg: "bg",
            color: "text",
            // transition: "background-color 200ms ease-in-out, color 200ms ease-in-out",
        },
        // "*, *::before, *::after": {
        //     transitionProperty: "background-color, color, border-color, fill, stroke",
        //     transitionDuration: "200ms",
        //     transitionTimingFunction: "ease-in-out",
        // },
    },
    theme: {
        tokens: {
            breakpoints: {
                sm: { value: "30rem" },  // 480px
                md: { value: "48rem" },  // 768px
                lg: { value: "64rem" },  // 1024px
            },
            colors: {
                blue: {
                    50: { value: "#EFF6FF" },
                    100: { value: "#DBEAFE" },
                    200: { value: "#BFDBFE" },
                    300: { value: "#93C5FD" },
                    400: { value: "#60A5FA" },
                    500: { value: "#3B82F6" },
                    600: { value: "#2563EB" },
                    700: { value: "#1D4ED8" },
                    800: { value: "#1E40AF" },
                    900: { value: "#1E3A8A" },
                },
                gray: {
                    50: { value: "#F9FAFB" },
                    100: { value: "#F3F4F6" },
                    200: { value: "#E5E7EB" },
                    300: { value: "#D1D5DB" },
                    400: { value: "#9CA3AF" },
                    500: { value: "#6B7280" },
                    600: { value: "#4B5563" },
                    700: { value: "#374151" },
                    800: { value: "#1F2937" },
                    900: { value: "#111827" },
                },
                green: {
                    50: { value: "#ECFDF5" },
                    100: { value: "#D1FAE5" },
                    200: { value: "#A7F3D0" },
                    300: { value: "#6EE7B7" },
                    400: { value: "#34D399" },
                    500: { value: "#10B981" },
                    600: { value: "#059669" },
                    700: { value: "#047857" },
                    800: { value: "#065F46" },
                    900: { value: "#064E3B" },
                },
                yellow: {
                    50: { value: "#FFFBEB" },
                    100: { value: "#FEF3C7" },
                    200: { value: "#FDE68A" },
                    300: { value: "#FCD34D" },
                    400: { value: "#FBBF24" },
                    500: { value: "#F59E0B" },
                    600: { value: "#D97706" },
                    700: { value: "#B45309" },
                    800: { value: "#92400E" },
                    900: { value: "#78350F" },
                },
                red: {
                    50: { value: "#FEF2F2" },
                    100: { value: "#FEE2E2" },
                    200: { value: "#FECACA" },
                    300: { value: "#FCA5A5" },
                    400: { value: "#F87171" },
                    500: { value: "#EF4444" },
                    600: { value: "#DC2626" },
                    700: { value: "#B91C1C" },
                    800: { value: "#991B1B" },
                    900: { value: "#7F1D1D" },
                },
                brand: {
                    50: { value: "{colors.blue.50}" },
                    100: { value: "{colors.blue.100}" },
                    200: { value: "{colors.blue.200}" },
                    300: { value: "{colors.blue.300}" },
                    400: { value: "{colors.blue.400}" },
                    500: { value: "{colors.blue.500}" },
                    600: { value: "{colors.blue.600}" },
                    700: { value: "{colors.blue.700}" },
                    800: { value: "{colors.blue.800}" },
                    900: { value: "{colors.blue.900}" },
                },
            },
        },
        semanticTokens: {
            colors: {
                bg: {
                    value: { base: "{colors.gray.50}", _dark: "{colors.gray.900}" },
                },
                cardBg: {
                    value: { base: "{colors.gray.200}", _dark: "{colors.gray.800}" },
                },
                text: {
                    value: { base: "{colors.gray.900}", _dark: "{colors.gray.100}" },
                },
                mutedText: {
                    value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" },
                },
                primary: {
                    value: { base: "{colors.brand.600}", _dark: "{colors.brand.400}" },
                },
                primaryFg: {
                    value: { base: "{colors.white}", _dark: "{colors.gray.900}" },
                },
                border: {
                    value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
                },
                accent: {
                    value: { base: "{colors.blue.500}", _dark: "{colors.blue.300}" },
                },
                success: {
                    value: { base: "{colors.green.500}", _dark: "{colors.green.400}" },
                },
                warning: {
                    value: { base: "{colors.yellow.500}", _dark: "{colors.yellow.400}" },
                },
                danger: {
                    value: { base: "{colors.red.500}", _dark: "{colors.red.400}" },
                },
                buttonPrimary: {
                    value: { base: "{colors.brand.600}", _dark: "{colors.brand.500}" },
                },
                buttonPrimaryHover: {
                    value: { base: "{colors.brand.700}", _dark: "{colors.brand.400}" },
                },
                buttonPrimaryFg: {
                    value: { base: "{colors.white}", _dark: "{colors.white}" },
                },
                buttonSecondary: {
                    value: { base: "{colors.gray.100}", _dark: "{colors.gray.700}" },
                },
                buttonSecondaryHover: {
                    value: { base: "{colors.gray.200}", _dark: "{colors.gray.600}" },
                },
                buttonSecondaryFg: {
                    value: { base: "{colors.gray.900}", _dark: "{colors.gray.100}" },
                },
            },
        },
    }
})

export const system = createSystem(defaultConfig, config)

