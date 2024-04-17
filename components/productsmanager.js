import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator, Button} from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../services/connerctionFirebase';
import ListProd from '../components/productslist';
import { Dialog } from 'react-native-simple-dialogs';
import Teste from './test';

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
    const [showDialog, setShowDialog] = useState(false);
    let [keytoDelet, setKeytoDelet] = useState("");
 // Estado para armazenar o id do item a ser excluído

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
// função para setar o id que vai ser deletado e mostrar o dialogo de confirmação
const handleDeleteItem = (key) => {
    setKeytoDelet(key)
    setShowDialog(true); 
  };
      //função para excluir um item 
function handleDelete(keytoDelet) {
    firebase.database().ref('/manga').child(keytoDelet).remove()
      .then(() => {
        //todos os itens que forem diferentes daquele que foi deletado
        //serão atribuidos no array
        const findProducts = products.filter(item => item.key !== keytoDelet)
        setProducts(findProducts)
      })
      setShowDialog(false);
      setKeytoDelet(""); 
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
            <Text style={styles.lista}>Listagem de Produtos</Text>
            </View>
            <View style={styles.listar}>
                <View style={styles.flatList}>
                        {loading ?
                                (<ActivityIndicator color="#121212" size={45} />) :
                                (<FlatList
                                        keyExtractor={item => item.key}
                                        data={products}
                                        renderItem={({ item }) => (
                                                <ListProd data={item} deleteItem={() =>  handleDeleteItem(item.key)}
                                                editItem={handleEdit} />
                                        )}
                                    />
                                )
                            }
                </View>
            </View>
            
            <Dialog
                visible={showDialog}
                onTouchOutside={() => setShowDialog(false)}
                title="Confirmar Exclusão"
                animationType="fade"
                contentStyle={{ alignItems: 'center', justifyContent: 'center' }}
                >
                
                    <View>
                        <Text>Deseja realmente excluir este item?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <Button title="Cancelar" onPress={() => setShowDialog(false)} />
                        <Button title="Confirmar" onPress={() => {handleDelete(keytoDelet)}} />
                        </View>
                    
                </View>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({

      button1: {
        padding: 10,
        backgroundColor: '#2196F3',
        color: 'white',
        borderRadius: 5,
      },
    container: {
        flex: 1,
        margin: 0,
        backgroundColor:"#bbb",
    },
    input: {
        borderWidth: 1,
        borderColor: '#121212',
        height: 40,
        fontSize: 13,
        borderRadius: 8,
        margin: 5,
        backgroundColor:"white",
    },
    separator: {
        marginVertical: 5,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3838ed',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 5,
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
    lista: {
        fontSize: 20,
        textAlign: 'center',
        margin:10,
        
    },
    listar:{
        width:"100%",
        flex:1,
        flexDirection:"column",
        alignItems:"center",
    },
    flatList:{
        flex: 1,
        width:"90%",
        height:"auto",
        backgroundColor:"gray",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
      },
}); 