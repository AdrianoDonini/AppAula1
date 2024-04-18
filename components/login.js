import React, { useState, } from 'react';
import { View, StyleSheet, Image, number, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import { Card, TextInput, Text, } from 'react-native-paper';
import firebase from '../services/connerctionFirebase';


export default function Login({changeStatus}) {
  const [type, setType] = React.useState('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('')

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validaSenha = (senha) =>{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:',<.>/?])(?!.*\s).{6,12}$/;
    return regex.test(senha);
  }

  function handleLogin() {

    if (type === 'login') {
      // Aqui fazemos o login 
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Email e/ou senha inválidos!');
          return;
        })
    } else {
      if(email == "" || email == null){
        alert("E-mail não informado");
        return;
      }
      if(validateEmail(email) == false){
        alert("E-mail invalido!");
      }
      if(password == "" || password == null){
        alert("Senha não informada!");
        return;
      }
      if(validaSenha(password) == false){
        alert("A senha deve conter de 6 a 12 caracters, ao menos uma letra maiúcas e minúscula, ao menos uma número e um caracter especial");
      }
      if((email != "" || email != null) && (password != "" || password != null) && validateEmail(email) && validaSenha(password)){
        const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log("LOG:"+err);
          alert(err);
          return;
        })
      }
      // Aqui cadastramos o usuario  

    }
  }

  return (
    <ImageBackground 
    source={require('../assets/apresentacao1.jpg')}
    resizeMode="stretch"
    style={styles.container}>
      
      <SafeAreaView style={styles.mainContent}>
      
      <Card style={styles.styleCard}> 
      <Image style={styles.logo} source={require('../assets/user-account-login-icon.png')} />
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
              <button style={{ textAlign: 'center', padding:10, marginTop:5, borderRadius:8, fontSize: 20, marginRight:18}}>
                {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
              </button>
            </TouchableOpacity>
        </Card.Content>
      </Card>
        
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "rgba(128, 128, 128, 0.37)",
    textAlign: "center",
    width:"100%",
    height:"100%",
    alignItems:"center",
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
    marginRight:20,
  },
  mainContent:{
    width:320,
    backgroundColor: 'none',
    marginLeft: 10,
    marginRight:10,
  },
  styleCard:{
    marginTop: "8vh",
    backgroundColor: '#bbb',
  }
  
}); 