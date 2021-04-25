import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../Components/Loading'
import AddTaskForm from '../Components/Task/AddTaskForm'
import Toast from 'react-native-easy-toast'

export default function AddTask({ navigation }) {
    toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
        <View>
            <AddTaskForm 
                navigation = {navigation} 
                setLoading = {setLoading} 
                toastRef = {toastRef}
            />
            <Loading isVisible = {loading} text = "Creando Tarea..." />
            <Toast ref = {toastRef} position = "center" opacity = {0.9}/>
        </View>
    )
}           

const styles = StyleSheet.create({})
