import 'react-native-gesture-handler'

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Details } from './pages/Details'

const AppStack = createStackNavigator()

export const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name='Home' component={Home} />
                <AppStack.Screen name='Dashboard' component={Dashboard} />
                <AppStack.Screen name='Details' component={Details} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
