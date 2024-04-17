import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
 
export default function ShopsList({ data, deleteItem, editItem }){
  return(
<View style={styles.container}>
    <Text style={styles.text}>Cidade Da Loja: {data.cidadeLoja}</Text>
    <Text style={styles.text}>Endereco: {data.endereco}</Text>
    <Text style={styles.text}>CEP: {data.cep}</Text>
    <Text style={styles.text}>Tamanho da loja(1 - 5): {data.tamanho}</Text>
    <Text style={styles.text}>Satisfação dos clientes(1 - 5): {data.satisfacao}</Text>
    
    <View style={styles.item}>
        <TouchableOpacity onPress={()=> deleteItem(data.key)}>
        <Icon name="trash" color="#A52A2A" size={20}>Excluir</Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editItem(data)}>
        <Icon name="create" color="blue" size={20}>Editar</Icon>
        </TouchableOpacity>
    </View>
    
</View>

  )
}
 
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    width:"80vw",
    marginLeft:"3vw",
    borderRadius:10,
    height: "auto",
    marginRight:5,
  },
  text:{
    color:'black',
    fontSize: 17
  },
  item: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-around'
  }
});