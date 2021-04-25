import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'

import { loginWithEmailAndPassword } from '../../Utils/actions'
import { validateEmail } from '../../Utils/helpers'
import Loading from '../Loading'

export default function LoginForm() {

    const navigation = useNavigation()

    const [formData, setFormData] = useState(DefaultValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const onLogin = async() => {
        if(!validateForm()){
            return
        }

        setLoading(true)
        const response = await loginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)

        if(!response.statusResponse){
            setErrorEmail(response.error)
            setErrorPassword(response.error)
            return
        }
        
        navigation.navigate("userlog")
    }

    const validateForm = () => {
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un Email válido.")
            isValid = false
        }

        if(isEmpty(formData.password)){
            setErrorPassword("Debes ingresar tu contraseña.")
        }

        return isValid
        
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle = {styles.view}>
            <View>
                <Input
                    placeholder = "Ingresar Correo..."
                    defaultValue = {formData.email}
                    errorMessage = {errorEmail}
                    keyboardType = "email-address"
                    onChange = {(e) => onChange(e, "email")}
                />
                <Input
                    placeholder = "Ingresar Contraseña..."
                    defaultValue = {formData.password}
                    errorMessage = {errorPassword}
                    password = {true}
                    secureTextEntry = {!showPassword}
                    onChange = {(e) => onChange(e, "password")}
                    rightIcon ={
                        <Icon
                            type = "material-community"
                            name = { showPassword ? "eye-off-outline" : "eye-outline" }
                            size = {22}
                            onPress = {() => setShowPassword(!showPassword)}
                        />
                    }
                />
                <Button
                    title = "Iniciar Sesión"
                    onPress = {onLogin}
                    buttonStyle = {{ backgroundColor: "#073a9a", borderRadius: 5 }}
                />
                <Loading isVisible = {loading} text = "Iniciando Sesión..."/>
            </View>
        </KeyboardAwareScrollView>
    )
}

function DefaultValues() {
    return{
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        width: "90%",
        alignSelf: "center"
    }
})
