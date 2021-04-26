import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, ImageBackground, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
            <View style = {styles.input}>
                <Input
                    containerStyle = {styles.container}
                    inputContainerStyle = {styles.containerInput}
                    placeholder = "Ingresar Tarea"
                    defaultValue = {task}
                    errorMessage = {errorTask}
                    onChange = {(e) => setTask(e.nativeEvent.text)}
                />
            </View>
            <Button
                title = "   Adicionar Tarea"
                onPress = {AddTask}
                buttonStyle = {{ backgroundColor: "#073a9a", borderRadius: 5 }}
                icon = {
                    <Icon
                    type = "material-community"
                    name = "plus-box"
                    color = "#fff"
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginVertical: 20,
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
