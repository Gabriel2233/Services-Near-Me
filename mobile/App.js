import React from 'react';
import { Routes } from './src/Routes'
import { AppLoading } from 'expo'
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'
import { ThemeContextProvider } from './src/context/ThemeContext'

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <ThemeContextProvider>
      <Routes />
    </ThemeContextProvider>
  )
}

