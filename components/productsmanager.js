import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../services/connerctionFirebase';
import database from '@react-native-firebase/database';

const Separator = () => {
    return <View style={StyleSheet.separator} />
}
export default function ProductsManager() {
    const [name, setName] = useState("");
    const [autor, setAutor] = useState("");
    const [editora, setEditora] = useState("");
    const [genero, setGenero] = useState("");
    const [preco, setPreco] = useState("");

    
    function cadastrarManga(){
        firebase.database().ref('/manga').push({
            idProtudo:{
                nome:name,
                autor:autor,
                editora:editora,
                genero:genero,
                preco:preco,
            },
        }).then(()=> console.log("Salvado Com Sucesso!")).catch(error => console.log("Error:",error));
    }
    return (
        <View style={styles.container}>

            <TextInput
                placeholder="Mangá"
                left={<TextInput.Icon icon="book-open" />}
                maxLength={40}
                style={styles.input}
                onChangeText={(texto) => setName(texto)}
                value={name}
            />
            <Separator />
            <TextInput
                placeholder="Autor"
                left={<TextInput.Icon icon="account" />}
                style={styles.input}
                onChangeText={(texto) => setAutor(texto)}
                value={autor}
            />
            <Separator />
            <TextInput
                placeholder="Editora"
                left={<TextInput.Icon icon="book-open-page-variant" />}
                style={styles.input}
                onChangeText={(texto) => setEditora(texto)}
                value={editora}
            />
            <Separator />
            <TextInput
                placeholder="Genero"
                left={<TextInput.Icon icon="ab-testing" />}
                style={styles.input}
                onChangeText={(texto) => setGenero(texto)}
                value={genero}
            />

            <Separator />
            <TextInput
                placeholder="Preço"
                left={<TextInput.Icon icon="cash" />}
                style={styles.input}
                onChangeText={(texto) => setPreco(texto)}
                value={preco}
            />
            <Separator />
            <TouchableOpacity onPress={cadastrarManga} style={styles.button} activeOpacity={0.5}>
                <Text style={styles.buttonTextStyle}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#121212',
        height: 40,
        fontSize: 13,
        borderRadius: 8
    },
    separator: {
        marginVertical: 5,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3ea6f2',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
        width:"100%",
        fontSize: 20,
        textAlign: 'center',
    },
    buttonIconSeparatorStyle: {
        backgroundColor: '#fff',
        width: 1,
        height: 20,
    },
    listar: {
        fontSize: 20,
        textAlign: 'center'
    }
}); 