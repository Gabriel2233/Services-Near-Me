import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../../context/ThemeContext'
import Icon from '@expo/vector-icons/Ionicons'
import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios'

export function Home({ navigation }) {

    const context = useContext(ThemeContext)
    const { isLightTheme, dark, light, toggleTheme } = context
    const actualTheme = isLightTheme ? light : dark

    const [ufs, setUfs] = useState([])
    const [cities, setCities] = useState([])

    const [selectedUf, setSelectedUf] = useState('')
    const [selectedCity, setSelectedCity] = useState('')

    useEffect(() => {
       axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => setUfs(response.data))
    }, [])

    useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => setCities(response.data))
    }, [selectedUf])

    const handleSubmit = () => {
        const data = {
            selectedUf,
            selectedCity
        }

        navigation.navigate('Dashboard', data)
    }

    return (
           <KeyboardAvoidingView style={[styles.background, { backgroundColor: actualTheme.bg }]}>
           <View style={styles.logoTitle}>
               <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Text>Logo</Text>
                    <Text style={{fontSize: 24, padding: 10, fontFamily: 'Roboto_500Medium', color: actualTheme.syntax}}>Title</Text>
               </View>

               <Icon onPress={toggleTheme} name='ios-contrast' size={24} color={actualTheme.syntax} />
           </View>
           
           <View style={styles.texts}>
               <View style={styles.textsView}>
                    <Text style={[styles.mainText, { color: actualTheme.syntax }]}>
                        Your App for finding near services.
                    </Text>
                    <Text style={[styles.descriptionText , { color: actualTheme.syntax }]}>
                        Find what you want in an easy way
                    </Text>
               </View>
            </View>
          
           <View style={styles.uiContainer}>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={{ inputAndroid: [uiStyles.inputStyles, { backgroundColor: actualTheme.ui, color: actualTheme.syntax }] }}
                    placeholder={{label: 'Select a UF'}}
                    onValueChange={(value) => setSelectedUf(value)}
                    items={
                        ufs.map(uf => (
                            {label: uf.sigla, value: uf.sigla}
                        ))
                    }
                />

                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={{ inputAndroid: [uiStyles.inputStyles, { backgroundColor: actualTheme.ui, color: actualTheme.syntax }] }}
                    placeholder={{label: 'Select a City', value: null}}
                    onValueChange={(value) => setSelectedCity(value)}
                    items={
                        cities.map(city => (
                            {label: city.nome, value: city.nome}
                        ))
                    }
                />
                <TouchableOpacity style={styles.findBtn} onPress={handleSubmit}>
                    <Text style={styles.btnText}>Find</Text>
                </TouchableOpacity>
           </View>

        </KeyboardAvoidingView>
    )
}

const uiStyles = StyleSheet.create({
    inputStyles: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    paddingRight: 30,
    height: 65,
    marginBottom: 15
  }
})

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
 
    logoTitle: {
        width: '100%',
        paddingHorizontal: 24,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Ubuntu_700Bold',  
        flexDirection: 'row'
    },
 
    img: {
        width: 52,
        height: 52
     },
 
     texts: {
         flex: 1,
         alignItems: 'flex-start',
         flexDirection: 'row',
         width: '100%',
         paddingHorizontal: 24   
     },
 
     textsView: {
         flexDirection: 'column',
         height: '100%',
     },
 
     mainText: {
         fontSize: 42,
         fontFamily: 'Ubuntu_700Bold',
     },
     
     descriptionText: {
         fontSize: 14,
         fontFamily: 'Roboto_500Medium',
     },
 
     uiContainer: {
         flex: 1,
         justifyContent: 'center',
         width: '100%',
         paddingHorizontal: 24
     },
 
     findBtn: {
         backgroundColor: 'springgreen',
         alignItems: 'center',
         justifyContent: 'center',
         width: '100%',
         borderRadius: 10,
         height: 65,
     },
 
     btnText: {
         color: '#fff',
         fontSize: 20
     },
 })



