import React, { useState, createContext } from 'react'

export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {

    const [themeState, setThemeState] = useState({
        isLightTheme: false,
        light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
        dark: { syntax: '#ddd', ui: '#333', bg: '#555'}
    })

    const toggleTheme = () => {
        setThemeState({...themeState, isLightTheme: !themeState.isLightTheme})
    }

    return(
        <ThemeContext.Provider value={{...themeState, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}