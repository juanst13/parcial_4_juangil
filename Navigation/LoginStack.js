import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../Screen/Login'
import UserLogged from '../Screen/UserLogged'
import AddTask from '../Screen/AddTask'
import EditTask from '../Screen/EditTask'

const Stack = createStackNavigator()

export default function LoginStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "login"
                component = {Login}
                options = {{ title: "Inicio de Sesión" }}
            />
            <Stack.Screen
                name = "userlog"
                component = {UserLogged}
                options = {{ title: "Tareas" }}
            />
            <Stack.Screen
                name = "add-task"
                component = {AddTask}
                options = {{ title: "Agregar Tarea" }}
            />
            <Stack.Screen
                name = "edit-task"
                component = {EditTask}
                options = {{ title: "Editar Tarea" }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
