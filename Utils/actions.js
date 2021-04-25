import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { result, take } from 'lodash'

const db = firebase.firestore(firebaseApp)

export const loginWithEmailAndPassword = async(email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)    
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no válidos."
    }
    return result
}

export const getCurrentUser = () =>{
    return firebase.auth().currentUser
}

export const addDocumentWithOutId = async(collection, data) => {
    const result = { statusResponse: true, error: null}
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getTasks = async() => {
    const result = { statusResponse: true, error: null, tasks: [] }
    try {
        const response = await db
        .collection("tasks")
        .where("idUser", "==", getCurrentUser().uid)
        .get()
        response.forEach((doc) => {
            const task = doc.data()
            task.id = doc.id
            result.tasks.push(task)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getDocumentById = async(collection,id) => {
    const result = { statusResponse: true, error: null, document: null }
    try {
        const response = await db.collection(collection).doc(id).get()
        result.document = response.data()
        result.document.id = response.id
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const updateDocument = async(collection, id, data) => {
    const result = { statusResponse: true, error: null}
    try {
        await db.collection(collection).doc(id).update(data)
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const deleteTask = async(id) => {
    const result = { statusResponse: true, error: false}
    try {
        await db.collection("tasks").doc(id).delete()
    } catch (error) {
        result.statusResponse = false
        result.erro = error
    }
    return result
}