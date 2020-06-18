import React, { useEffect, useContext, useState } from 'react'
import { View, Text, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import { ThemeContext } from '../../context/ThemeContext'
import { api } from '../../services/api'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import Icon from '@expo/vector-icons/Ionicons'

export const Dashboard = ({ route, navigation }) => {

    const context = useContext(ThemeContext)
    const { isLightTheme, dark, light } = context
    const actualTheme = isLightTheme ? light : dark

    const { selectedUf } = route.params
    const { selectedCity } = route.params

    const [initialPosition, setInitialPosition] = useState([])
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)

    const handleNavigateToDetail = (id) => {
        navigation.navigate('Details', { serviceId: id })
    }
    
    useEffect(() => {

        const abortController = new AbortController()
        const signal = abortController.signal

        api.get(`services/${selectedUf}/${selectedCity}`, { signal: signal }).then(response => setServices(response.data))

        return () => {
            abortController.abort()
        }
    }, [])

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync()

            if(status !== 'granted') {
                Alert.alert('Oopss...', 'You need to enable localization to access all functionalities of the app')
                return;
            }

            const location = await Location.getCurrentPositionAsync()
            const { latitude, longitude } = location.coords

            setInitialPosition([
                latitude,
                longitude
            ])

            setLoading(false)
        }

        loadPosition()
    }, [])


    return (
        <View style={[styles.container, {backgroundColor: actualTheme.bg }]}>
           <Icon name='ios-arrow-round-back' size={36} color='springgreen' style={styles.icon} onPress={() => navigation.goBack()} />   

            <View style={styles.textView}>
                    <Text style={[styles.resultsText, {color: actualTheme.syntax}]}>Here are the results for your search.</Text>
                    <Text style={[styles.guide, {color: actualTheme.syntax}]}>Click on a marker to see more details about the service.</Text>
            </View>  

           <View style={styles.mapView}>
               {loading ? <ActivityIndicator color='springgreen' size={36} style={{marginTop: 100}} /> : (
                   <MapView
                   style={styles.map}
                   initialRegion={{
                      latitude: initialPosition[0],
                      longitude: initialPosition[1],
                      latitudeDelta: 0.014,
                      longitudeDelta: 0.014,
                    }} 
                 >   
                  {services.map(service => (
                          <Marker
                             onPress={() => handleNavigateToDetail(service._id)}
                             key={service._id}
                             style={styles.marker}
                             coordinate={{
                                 latitude: service.latitude,
                                 longitude: service.longitude
                             }}
                          >
                              <TouchableOpacity>
                                  <Text style={[styles.markerText, {backgroundColor: actualTheme.ui, color: actualTheme.syntax}]}>{service.name}</Text>
                                  <Icon style={{alignSelf: 'center'}} name='ios-pin' size={32} color='red' />
                              </TouchableOpacity>
                       </Marker>
                  ))}
                 </MapView>   
               )}
           </View>
        </View>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        alignSelf: 'flex-start',
        paddingVertical: 32,
        paddingHorizontal: 16
    },

    textView: {
        flex: (1 / 4),
        justifyContent: "center",
        alignSelf: 'flex-start',
        paddingHorizontal: 24
   },

   resultsText: {
       fontFamily: 'Ubuntu_700Bold',
       fontSize: 25,
   },

   guide: {
       fontFamily: 'Roboto_500Medium',
       fontSize: 14,
   },

   mapView: {
       flex: 1,
       width: '100%',
       height: '100%',
       paddingHorizontal: 24,
       marginBottom: 24
    },
    
    map: {
        borderWidth: 1,
        borderColor: 'red',
        width: '100%',
        height: '70%',
    },

    markerText: {
        fontFamily: 'Roboto_500Medium',
        borderRadius: 10,
        padding: 5
    }
})