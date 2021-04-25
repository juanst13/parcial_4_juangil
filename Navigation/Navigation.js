import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LoginStack from './LoginStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name = " "
                    component = {LoginStack}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
