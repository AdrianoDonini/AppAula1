import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../services/connerctionFirebase';
import ListProd from '../components/productslist';

const Separator = () => {
    return <View style={StyleSheet.separator} />
}
export default function ProductsManager() {
    const [name, setName] = useState("");
    const [autor, setAutor] = useState("");
    const [editora, setEditora] = useState("");
    const [genero, setGenero] = useState("");
    const [preco, setPreco] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key , setKey] = useState("");
    const inputRef = useRef(null);

    
    /*function cadastrarManga(){
        firebase.database().ref('/manga').push({
                nome:name,
                autor:autor,
                editora:editora,
                genero:genero,
                preco:preco,
        }).then(()=> console.log("Salvo Com Sucesso!")).catch(error => console.log("Error:",error));
    }*/
    //método para inserir ou alterar os dados produtos 
    useEffect(() => {
 
        async function search() {
          await firebase.database().ref('/manga').on('value', (snapshot) => {
            setProducts([]);
            snapshot.forEach((chilItem) => {
              let data = {
                //de acordo com a chave de cada item busca os valores
                //cadastrados na relação e atribui nos dados
                key: chilItem.key,
                name: chilItem.val().name,
                autor: chilItem.val().autor,
                editora: chilItem.val().editora,
                genero: chilItem.val().genero,
                preco: chilItem.val().preco,
              };
              setProducts(oldArray => [...oldArray, data].reverse());
            })
            setLoading(false);
          })
        }
        search();
      }, []);

  async function insertUpdate() { 

    //editar dados 

    if (name !== '' & autor !== '' & editora !== '' &  
        genero !== '' & preco !== '' & key !== '') { 
        firebase.database().ref('/manga').child(key).update({
            name: name, 
            autor: autor, 
            editora: editora, 
            genero:genero,
            preco:preco, 
        }) 
        //para o teclado do celular fixo abaixo do formulário (não flutuante) 
        Keyboard.dismiss(); 
        alert('Produto Alterado!'); 
        clearData(); 
        setKey(''); 
        return; 
    } 
    //cadastrar dados - insert 
    let prods = await firebase.database().ref('manga'); 
    let keyprod = prods.push().key; //cadastar os dados

    prods.child(keyprod).set({ 
        name: name, 
        autor: autor, 
        editora: editora, 
        genero:genero,
        preco:preco,
    }); 
    alert('Produto Inserido!'); 
    clearData(); 
} 

function clearData() { 
    setName(''); 
    setAutor(''); 
    setEditora(''); 
    setGenero('');
    setPreco(''); 
} 
      //função para excluir um item 
function handleDelete(key) {
    firebase.database().ref('/manga').child(key).remove()
      .then(() => {
        //todos os itens que forem diferentes daquele que foi deletado
        //serão atribuidos no array
        const findProducts = products.filter(item => item.key !== key)
        setProducts(findProducts)
      })
  }
 
  //função para editar 
  function handleEdit(data) {
      setKey(data.key),
      setName(data.name),
      setAutor(data.autor),
      setEditora(data.editora),
      setGenero(data.genero),
      setPreco(data.preco)
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
            <TouchableOpacity onPress={insertUpdate} style={styles.button} activeOpacity={0.5}>
                <Text style={styles.buttonTextStyle}>Cadastrar</Text>
            </TouchableOpacity>
            <View>
            <Text style={styles.listar}>Listagem de Produtos</Text>
            </View>
                     {loading ?
                            (<ActivityIndicator color="#121212" size={45} />) :
                            (<FlatList
                                    keyExtractor={item => item.key}
                                    data={products}
                                    renderItem={({ item }) => (
                                            <ListProd data={item} deleteItem={handleDelete}
                                            editItem={handleEdit} />
                                    )}
                                />
                            )
                        }
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