import React, { useCallback, useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { getCurrentUser, getTasks } from '../Utils/actions'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { ActivityIndicator, FlatList } from 'react-native'
import Toast from 'react-native-easy-toast'
import { TouchableOpacity } from 'react-native'

import Loading from '../Components/Loading'

export default function UserLogged({ navigation }) {
    const toastRef = useRef()

    const [user, setUser] = useState("")
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const response = getCurrentUser()
            setUser(response)
            const responseTasks = await getTasks()
            setTasks(responseTasks.tasks)
            setLoading(false)
        }
        getData()
    }, [user,tasks])
    
    if (!tasks) {
        return <Loading isVisible={true} text="Cargando tareas..."/>
    } else if(tasks?.length === 0){
        return <NotFoundTask navigation = {navigation}/>
    }

    return (
        <View style = {styles.view}>
            <Text style = {styles.title}>Bienvenido: {user.email}</Text>
            {
                tasks ? (
                    <FlatList
                        data = {tasks}
                        keyExtractor = {(item, index) => index.toString()}
                        renderItem = {(task) => (
                            <Task
                                task = {task}
                                setLoading = {setLoading}
                                toastRef = {toastRef}
                                navigation = {navigation}
                            />
                        )}
                    />
                ) : (
                    <Loading isVisible = {true} text = "Cargando Tareas..."/>
                )
            }
            
            <Icon
                type="material-community"
                name="plus"
                color="#442484"
                size = {25}
                reverseColor = "white"
                reverse
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("add-task")}
            />
        </View>
    )
}

function Task({ task, navigation, setLoading, toastRef }) {
    const { id, name } = task.item

    return(
        <View style = {styles.item}>
            <TouchableOpacity
                onPress = {() => navigation.navigate("edit-task", { id, name: name })}
            >
                <View style = {styles.list}>
                    <Icon
                        type = "material-community"
                        name = "playlist-star"
                        style = {{ marginHorizontal: 3 }}
                        iconStyle = {{ color: "#9c9c9c" }}
                    />
                    <Text style = {styles.content}>{name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

function NotFoundTask({ navigation }) {
    return(
        <View style = {{ flex:1, alignItems: "center", justifyContent: "center"}}>
            <Icon type = "material-community" name = "alert-outline" size = {50} color= "#000"/>
            <Text style = {{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
                    Aún no tienes tareas
            </Text>
            <Icon
                type="material-community"
                name="plus"
                color="#442484"
                size = {25}
                reverseColor = "white"
                reverse
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("add-task")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flex: 1,
        backgroundColor: "#e1e1e1"
    },
    btnContainer:{
        position: "absolute",
        bottom: 10,
        right: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 15
    },
    item:{
        marginTop: 10,
        marginLeft: 5,
        borderWidth: 1,
        width: "90%",
        alignSelf: "center",
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderColor: "#FFFFFF"
    },
    content:{
        fontSize: 16
    },
    list:{
        flexDirection: "row",
        marginHorizontal: 10
    },


})
