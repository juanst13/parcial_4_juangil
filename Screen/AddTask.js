import React, { useState, useRef } from 'react'
import { ImageBackground, Dimensions, StyleSheet, Text, View } from 'react-native'
import Loading from '../Components/Loading'
import AddTaskForm from '../Components/Task/AddTaskForm'
import Toast from 'react-native-easy-toast'

const {width,height} = Dimensions.get("window")

export default function AddTask({ navigation }) {
    toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
        <ImageBackground
            source = {require("../assets/652753.png")}
            style = {styles.img}
            resizeMode = "cover"
        >
        <View style = {styles.view}>
            <AddTaskForm 
                navigation = {navigation} 
                setLoading = {setLoading} 
                toastRef = {toastRef}
            />
            <Loading isVisible = {loading} text = "Creando Tarea..." />
            <Toast ref = {toastRef} position = "center" opacity = {0.9}/>
        </View>
        </ImageBackground>
    )
}           

const styles = StyleSheet.create({
    view:{
        flex: 1,
        width: "90%",
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    img:{
        width: width,
        height: "100%"
    }
})
