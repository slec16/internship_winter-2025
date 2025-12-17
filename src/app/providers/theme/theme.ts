import {
    createSystem,
    defaultConfig,
    defineConfig,
} from "@chakra-ui/react"

import { colors, breakpoints } from "./foundations"
import { semanticColors } from "./semantic-tokens"
import { globalCss } from "./global-css"
import { conditions } from "./conditions"

const config = defineConfig({
    conditions,
    globalCss,
    theme: {
        tokens: {
            breakpoints,
            colors,
        },
        semanticTokens: {
            colors: semanticColors,
        },
    }
})

export const system = createSystem(defaultConfig, config)
