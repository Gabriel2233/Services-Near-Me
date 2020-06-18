import React, { useState, useEffect, useContext }from 'react'
import { api } from '../../services/api'
import { View, Text, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { ThemeContext } from '../../context/ThemeContext'
import Icon from '@expo/vector-icons/Ionicons'

export const Details = ({ route, navigation }) => {

    const context = useContext(ThemeContext)
    const { isLightTheme, dark, light } = context
    const actualTheme = isLightTheme ? light : dark

    const [serviceData, setServiceData] = useState({})

    const { serviceId } = route.params

    const today = new Date()
    const hours =  today.getHours()

    const openClosed = hours < serviceData.opensAt || hours > serviceData.closesAt ? 'Closed' : 'Opened'

    const iconName = serviceData.serviceType === 'health' ? 'ios-heart' : serviceData.serviceType === 'financial' ? 'ios-cash' : serviceData.serviceType === 'food' ? 'ios-pizza' : 'ios-alert'

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        api.get(`services/${serviceId}`, { signal: signal }).then(response => setServiceData(response.data))

        return () => {
            abortController.abort()
        }
    }, [])

    return (
        <View style={[styles.detailsContainer, { backgroundColor: actualTheme.bg }]}>
            <View style={styles.nameContainer}>
                <Text style={[styles.nameText, { color: actualTheme.syntax }]}>{serviceData.name}</Text>
                <Icon name={iconName} size={40} color={actualTheme.syntax} />
            </View>

            <View style={styles.hoursContainer}>
                <Text style={[styles.open, { color: actualTheme.syntax }]}>
                    Opens at: {serviceData.opensAt}h
                </Text>
                <Text style={[styles.closes, { color: actualTheme.syntax }]}>
                    Closes at: {serviceData.closesAt}h
                </Text>
            </View>

            <Text style={[styles.conclusion, { color: actualTheme.syntax }]}>
                    This service is now 
                    { ` ` }
                    <Text style={{ color: openClosed === 'Opened' ? 'springgreen' : 'red' }}>
                        {openClosed}
                    </Text>
            </Text>

            <RectButton style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.btnText}>Go Back</Text>
                </RectButton>
            </View>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 24
    },

    nameContainer: {
        padding: 10,
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },

    nameText:{
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 36,
    },

    hoursContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    open: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 22,
        paddingHorizontal: 24,
    },

    closes: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 22,
        paddingHorizontal: 24
    },

    conclusion: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 22,
        paddingHorizontal: 24,
        marginTop: 50,
        width: '100%',
    },

    backButton: {
        paddingHorizontal: 24,
        backgroundColor: 'springgreen',
        width: '100%',
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    btnText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 20, 
        color: '#fff',      
    }
})