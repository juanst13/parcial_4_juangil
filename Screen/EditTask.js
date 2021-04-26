import React, { useCallback, useRef, useState, useEffect } from 'react'
import { Alert, Dimensions,ImageBackground, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { deleteTask, getDocumentById, updateDocument } from '../Utils/actions'
import Loading from '../Components/Loading'

const {width,height} = Dimensions.get("window")

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
        <ImageBackground
            source = {require("../assets/652753.png")}
            style = {styles.img}
            resizeMode = "cover"
        >
            <View style = {styles.viewContainer}>
                <View style = {styles.view}>
                    <View style = {styles.input}> 
                        <Input
                            containerStyle = {styles.container}
                            inputContainerStyle = {styles.containerInput}
                            placeholder = "Ingrese la tarea..."
                            defaultValue = {editTask.name}
                            onChange = {(e) => setEditTask(e.nativeEvent.text)}
                            errorMessage = {errorEditTask}
                        />
                    </View>
                    <Button
                        title= "  Editar Tarea"
                        onPress = {changeTask}
                        titleStyle = {{ fontSize: 18 }}
                        buttonStyle = {styles.btnEdit}
                        icon = {
                            <Icon
                            type = "material-community"
                            name = "square-edit-outline"
                            color = "#fff"
                            />
                        }
                    />
                    <Button
                        title= "  Completar Tarea"
                        onPress = {confirmRemoveTask}
                        titleStyle = {{ fontSize: 18, color: "#000" }}
                        buttonStyle = {styles.btnComplete}
                        icon = {
                            <Icon
                            type = "material-community"
                            name = "sticker-check-outline"
                            color = "#000"
                            />
                        }
                    />
                    <Loading isVisible={loading} text = "Modificando Tarea..."/>
                    <Toast ref={toastRef} position="center" opacity={0.9}/>
                </View>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    viewContainer:{
        flex: 1
    },
    view:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        width: "90%",
        alignSelf: "center"
    },
    btnEdit:{
        backgroundColor: "#073a9a", 
        borderRadius: 5, 
        marginVertical: 10, 
        padding: 10
    },
    btnComplete:{
        backgroundColor: "#FFFF", 
        borderRadius: 5, 
        marginVertical: 10, 
        padding: 10
    },
    img:{
        width: width,
        height: "100%"
    },
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
