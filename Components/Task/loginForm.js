import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Dimensions, ImageBackground,  Text, View } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'

import { loginWithEmailAndPassword } from '../../Utils/actions'
import { validateEmail } from '../../Utils/helpers'
import Loading from '../Loading'

const {width, height} = Dimensions.get("window")

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
        <ImageBackground
            source = {require("../../assets/652753.png")}
            style = {styles.img}
            resizeMode = "cover"
        >
        <KeyboardAwareScrollView contentContainerStyle = {styles.view}>
            <View style = {styles.input}>
                <Input
                    containerStyle = {styles.container}
                    inputContainerStyle = {styles.containerInput}
                    placeholder = "Ingresa Correo..."
                    defaultValue = {formData.email}
                    errorMessage = {errorEmail}
                    keyboardType = "email-address"
                    onChange = {(e) => onChange(e, "email")}
                />
            </View>
            <View style = {styles.input}>
                <Input
                    containerStyle = {styles.container}
                    inputContainerStyle = {styles.containerInput}
                    placeholder = "Ingresa Contraseña..."
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
                            color = "#000"
                        />
                    }
                />
            </View>
                <Button
                    title = "  Iniciar Sesión"
                    onPress = {onLogin}
                    buttonStyle = {{ backgroundColor: "#073a9a", borderRadius: 5, marginVertical: 20 }}
                    titleStyle = {{ fontSize: 18 }}
                    icon = {
                        <Icon
                        type = "material-community"
                        name = "login"
                        color = "#fff"
                        />
                    }
                />
                <Loading isVisible = {loading} text = "Iniciando Sesión..."/>
        </KeyboardAwareScrollView>
        </ImageBackground>
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
    },
    img:{
        width: width,
        height: "100%"
    },
    input:{
        marginTop: 10,
        borderLeftWidth: 1,
        borderRightWidth: 3,
        borderTopWidth: 1,
        borderBottomWidth: 3,
        width: "95%",
        borderRadius: 25,
        borderColor: "#C3C3C3",
        backgroundColor: "white",
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    containerInput:{
        borderBottomWidth: 0
    },
    container:{
        marginHorizontal: 30,
        width:"95%",
        alignSelf: "center"
        
    }
})
