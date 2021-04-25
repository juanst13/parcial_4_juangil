import React, { useCallback, useRef, useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import { Button, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { deleteTask, getDocumentById, updateDocument } from '../Utils/actions'
import Loading from '../Components/Loading'

export default function EditTask({ navigation, route }) {
    const { id, name } = route.params
    const toastRef = useRef()

    const [editTask, setEditTask] = useState(name)
    const [errorEditTask, setErrorEditTask] = useState("")
    const [loading, setLoading] = useState(false)

        useEffect(() => {
            (async() => {
                const response = await getDocumentById("tasks", id)
                if (response.statusResponse){
                    setEditTask(response.document)
                } else {
                    setEditTask({})
                    Alert.alert
                    ("Ocurrió un problema cargando la tarea, por favor intente más tarde.")
                }
            })()
        }, [])

        const changeTask = async() => {
            if(!validateData()){
                return
            }

            setLoading(true)
            const response = await updateDocument("tasks", id , {
                name: editTask
            })
            setLoading(false)

            if(!response.statusResponse)
            {
                toastRef.current.show("Ha ocurrido un error al actualizar la tarea, por favor intente más tarde", 3000)
            }

            navigation.navigate("userlog")

        }

        const validateData = () => {
            setErrorEditTask("")
            let isValid = true

            if(isEmpty(editTask)){
                setErrorEditTask("Debes ingresar una tarea.")
                isValid = false
            }
            return isValid
        }

        const confirmRemoveTask = () =>{
            Alert.alert(
                "Completar Tarea",
                "¿Estas seguro que deseas completar la tarea?",
                [
                    {
                        text: "No",
                        style: "cancel"
                    },
                    {
                        text: "Si",
                        onPress: removeTask
                    }
                ],
                    { cancelable: false }
            )
        }

        const removeTask = async() => {
            setLoading(true)
            const responseRemove = await deleteTask(id)
            setLoading(false)

            if(!responseRemove.statusResponse){
                toastRef.current.show("Ha ocurrido un error al completar la tarea.", 3000)
            }
            navigation.navigate("userlog")
        }

    return (
        <View>  
            <Input
                placeholder = "Ingrese la tarea..."
                defaultValue = {editTask.name}
                onChange = {(e) => setEditTask(e.nativeEvent.text)}
                errorMessage = {errorEditTask}
            />
            <Button
                title= "Editar Tarea"
                onPress = {changeTask}
            />
            <Button
                title= "Completar Tarea"
                onPress = {confirmRemoveTask}
            />
            <Loading isVisible={loading} text = "Modificando Tarea..."/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </View>
    )
}


const styles = StyleSheet.create({})
