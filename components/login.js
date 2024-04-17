import React, { useState, } from 'react';
import { View, StyleSheet, Image, number, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import { Card, TextInput, Text, } from 'react-native-paper';
import firebase from '../services/connerctionFirebase';


export default function Login({changeStatus}) {
  const [type, setType] = React.useState('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('')

  function handleLogin() {

    if (type === 'login') {
      // Aqui fazemos o login 
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Email ou senha não cadastrados!');
          return;
        })
    } else {
      // Aqui cadastramos o usuario  
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Erro ao Cadastrar!');
          return;
        })
    }
  }

  return (
    <ImageBackground 
    source={require('../assets/apresentacao1.jpg')}
    style={styles.container}>
      
      <SafeAreaView style={styles.mainContent}>
      <Image style={styles.logo} source={require('../assets/user-account-login-icon.png')} />
      <Card style={styles.styleCard}> 
      <Card.Title title="" subtitle="" />
      <Card.Content>
            <TextInput
              style={styles.label}
              mode="outlined"
              label="Email"
              outlineColor="#ff0000"
              activeOutlineColor="#ff0000"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.label}
              mode="outlined"
              label="Senha"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
              outlineColor="#ff0000"
              activeOutlineColor="#ff0000"
            />
      </Card.Content>
      </Card>
        <Card.Content style={styles.mainContent}>
            <TouchableOpacity
              style={[styles.handleLogin,
              { backgroundColor: type === 'login' ? '#3838ed' : '#141414' }]}
              onPress={handleLogin}
            >
                <Text style={styles.loginText}>
                  {type === 'login' ? 'Acessar' : 'Cadastrar'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')} >
              <button style={{ textAlign: 'center', padding:10, marginTop:5, borderRadius:8,}}>
                {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
              </button>
            </TouchableOpacity>
        </Card.Content>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "rgba(128, 128, 128, 0.37)",
    textAlign: "center",
  },

  logo: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom:10,
  },

  label: {
    marginBottom: 10,
    color: "red",
  },

  loginText: {
    color: "#FFF",
    fontSize: 24,
  },

  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginTop: 30,
    borderRadius:8,
  },
  mainContent:{

    backgroundColor: 'none',
    marginLeft: 10,
    marginRight:10,
  },
  styleCard:{
    backgroundColor: '#fff',
  }
  
}); 