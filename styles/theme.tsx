// 1. Import `createTheme`
import { createTheme, NextUIProvider, Text } from "@nextui-org/react"

// 2. Call `createTheme` and pass your custom values
export const theme = createTheme({
    type: 'light',
    theme: {
        colors: {
            // generic colors
            white: '#ffffff',
            black: '#000000',
        
            // background colors (light)
            background: "$blue",
            backgroundAlpha: "rgba(255, 255, 255, 1)", // used for semi-transparent backgrounds like the navbar
            foreground: "$black",
            backgroundContrast: "$white",
        
        
            //semantic colors (light)
            blue50: '#EDF5FF',
            // ...
            blue900: '#00254D',
            // ...
        
            // brand colors
            primaryLight: '$blue200',
            primaryLightHover: '$blue300', // commonly used on hover state
            primaryLightActive: '$blue400', // commonly used on pressed state
            primaryLightContrast: '$blue600', // commonly used for text inside the component
            primary: '$blue600',
            primaryBorder: '$blue500',
            primaryBorderHover: '$blue600',
            primarySolidHover: '$blue700',
            primarySolidContrast: '$white', // commonly used for text inside the component
            primaryShadow: '$blue500',

            brandPrimary: '#219EA4',
            primaryText: 'black',
            secondaryText: '#7E7C7C',
            brandBlue: '#22A6DD',
            brandPurple: '#630DF0',
            brandOrange: '#F0880D',
            brandGreen: '#55C130',
        
            // ... rest of colors (secondary, success, warning, error, etc)
        }
    }
});