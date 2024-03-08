import React, {useState} from 'react';
import { View, StyleSheet, Image, number, SafeAreaView, TouchableOpacity } from "react-native";
import { Card, TextInput, Text,} from 'react-native-paper';


export default function Login(){
  const [type,  setType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
<Image style={styles.logo} source={require('user-account-login-icon.png')} />
<Card>
<Card.Title title="" subtitle="" />
<Card.Content>
<Text variant="bodyMedium"></Text>
<TextInput
            style={styles.label}
            mode="outlined"
            label="Email"
            outlineColor="#ff0000"
            activeOutlineColor="#ff0000"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
<TextInput
            style={styles.label}
            mode="outlined"
            label="Senha"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            outlineColor="#ff0000"
            activeOutlineColor="#ff0000"
          />
</Card.Content>
</Card>
</View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  label: {
    marginBottom: 10,
    color: 'red',
  },
  loginText:{
    color: '#FFF',
    fontSize: 24,
  },
});