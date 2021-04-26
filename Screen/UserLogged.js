import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Dimensions, ImageBackground ,StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { getCurrentUser, getTasks } from '../Utils/actions'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { ActivityIndicator, FlatList } from 'react-native'
import Toast from 'react-native-easy-toast'
import { TouchableOpacity } from 'react-native'

import Loading from '../Components/Loading'

const {width,height} = Dimensions.get("window")

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
        <ImageBackground
            source = {require("../assets/652753.png")}
            style = {styles.img}
            resizeMode = "cover"
        >
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
                    color="#073a9a"
                    size = {25}
                    reverseColor = "white"
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("add-task")}
                />
            </View>
        </ImageBackground>
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
                        style = {{ marginHorizontal: 10 }}
                        iconStyle = {{ color: "#073a9a" }}
                        size = {30}
                    />
                    <Text style = {styles.content}>{name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

function NotFoundTask({ navigation }) {
    return(
        <ImageBackground
            source = {require("../assets/652753.png")}
            style = {styles.img}
            resizeMode = "cover"
        >
            <View style = {{ flex:1, alignItems: "center", justifyContent: "center"}}>
                <Text style = {{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>
                        Aún no tienes tareas.
                </Text>
                <Icon
                    type="material-community"
                    name="plus"
                    color="#073a9a"
                    size = {25}
                    reverseColor = "white"
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("add-task")}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    view:{
        flex: 1
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
        marginVertical: 15,
        color: "#fff"
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
        marginHorizontal: 10,
        alignItems: "center"
    },
    img:{
        width: width,
        height: "100%"
    }


})
