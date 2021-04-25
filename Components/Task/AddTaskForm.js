import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

import { addDocumentWithOutId, getCurrentUser } from '../../Utils/actions'

export default function AddTaskForm({ navigation, setLoading, toastRef }) {
    const [task, setTask] = useState("")
    const [errorTask, setErrorTask] = useState("")

    const AddTask = async() => {
        if(!validateData){
            return
        }

        const taskData = {
            name: task,
            createAt: new Date(),
            idUser: getCurrentUser().uid
        }

        setLoading(true)
        const response = await addDocumentWithOutId("tasks", taskData)
        setLoading(false)

        if(!response.statusResponse){
            toastRef.current.show
            ("Ha ocurrido un error al crear la tarea, por favor intente más tarde.", 3000)
        }
        navigation.navigate("userlog")
    }

    const validateData = () => {
        setErrorTask("")
        let isValid = true

        if(isEmpty(task)){
            errorTask("Debes ingresar una tarea.")
            isValid = false
        }
        
        return isValid
    }

    return (
        <View>
            <Input
                placeholder = "Ingresa nombre de tarea"
                defaultValue = {task}
                errorMessage = {errorTask}
                onChange = {(e) => setTask(e.nativeEvent.text)}
            />
            <Button
                title = "Adicionar tarea"
                onPress = {AddTask}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
