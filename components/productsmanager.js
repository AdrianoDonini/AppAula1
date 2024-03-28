import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../services/connerctionFirebase';

const Separator = () => {
    return <View style={StyleSheet.separator} />
}
export default function ProductsManager() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");

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
                onChangeText={(texto) => setBrand(texto)}
                value={brand}
            />
            <Separator />
            <TextInput
                placeholder="Editora"
                left={<TextInput.Icon icon="book-open-page-variant" />}
                style={styles.input}
                onChangeText={(texto) => setBrand(texto)}
                value={brand}
            />
            <Separator />
            <TextInput
                placeholder="Genero"
                left={<TextInput.Icon icon="ab-testing" />}
                style={styles.input}
                onChangeText={(texto) => setType(texto)}
                value={type}
            />

            <Separator />
            <TextInput
                placeholder="Preço"
                left={<TextInput.Icon icon="cash" />}
                style={styles.input}
                onChangeText={(texto) => setPrice(texto)}
                value={price}
            />
            <Separator />
            <TouchableOpacity onPress={""} style={styles.button} activeOpacity={0.5}>
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