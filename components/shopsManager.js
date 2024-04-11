import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator, Button, ImageBackground} from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../services/connerctionFirebase';
import ShopsList from '../components/shopsList';
import { Dialog } from 'react-native-simple-dialogs';
import Teste from './test';

const Separator = () => {
    return <View style={StyleSheet.separator} />
}
export default function ShopsManager() {
    const [cidadeLoja, setcidadeLoja] = useState("");
    const [endereco, setendereco] = useState("");
    const [cep, setcep] = useState("");
    const [tamanho, settamanho] = useState("");
    const [satisfacao, setsatisfacao] = useState("");
    const [shops, setshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key , setKey] = useState("");
    const inputRef = useRef(null);
    const [showDialog, setShowDialog] = useState(false);
    let [keytoDelet, setKeytoDelet] = useState("");
 // Estado para armazenar o id do item a ser excluído

    //método para inserir ou alterar os dados produtos 
    useEffect(() => {
 
        async function search() {
          await firebase.database().ref('shops').on('value', (snapshot) => {
            setshops([]);
            snapshot.forEach((chilItem) => {
              let data = {
                //de acordo com a chave de cada item busca os valores
                //cadastrados na relação e atribui nos dados
                key: chilItem.key,
                cidadeLoja: chilItem.val().cidadeLoja,
                endereco: chilItem.val().endereco,
                cep: chilItem.val().cep,
                tamanho: chilItem.val().tamanho,
                satisfacao: chilItem.val().satisfacao,
              };
              setshops(oldArray => [...oldArray, data].reverse());
            })
            setLoading(false);
          })
        }
        search();
      }, []);

  async function insertUpdate() { 

    //editar dados 

    if (cidadeLoja !== '' & endereco !== '' & cep !== '' &  
        tamanho !== '' & satisfacao !== '' & key !== '') { 
        firebase.database().ref('shops').child(key).update({
            cidadeLoja: cidadeLoja, 
            endereco: endereco, 
            cep: cep, 
            tamanho:tamanho,
            satisfacao:satisfacao, 
        }) 
        //para o teclado do celular fixo abaixo do formulário (não flutuante) 
        Keyboard.dismiss(); 
        alert('Produto Alterado!'); 
        clearData(); 
        setKey(''); 
        return; 
    } 
    //cadastrar dados - insert 
    let prods = await firebase.database().ref('shops'); 
    let keyprod = prods.push().key; //cadastar os dados

    prods.child(keyprod).set({ 
        cidadeLoja: cidadeLoja, 
        endereco: endereco, 
        cep: cep, 
        tamanho:tamanho,
        satisfacao:satisfacao,
    }); 
    alert('Produto Inserido!'); 
    clearData(); 
} 

function clearData() { 
    setcidadeLoja(''); 
    setendereco(''); 
    setcep(''); 
    settamanho('');
    setsatisfacao(''); 
} 
// função para setar o id que vai ser deletado e mostrar o dialogo de confirmação
const handleDeleteItem = (key) => {
    setKeytoDelet(key)
    setShowDialog(true); 
  };
      //função para excluir um item 
function handleDelete(keytoDelet) {
    firebase.database().ref('shops').child(keytoDelet).remove()
      .then(() => {
        //todos os itens que forem diferentes daquele que foi deletado
        //serão atribuidos no array
        const findshops = shops.filter(item => item.key !== keytoDelet)
        setshops(findshops)
      })
      setShowDialog(false);
      setKeytoDelet(""); 
  }

  //função para editar 
  function handleEdit(data) {
      setKey(data.key),
      setcidadeLoja(data.cidadeLoja),
      setendereco(data.endereco),
      setcep(data.cep),
      settamanho(data.tamanho),
      setsatisfacao(data.satisfacao)
  }
    return (
        <ImageBackground       
            source={require('../assets/apresentacao1.jpg')} // Altere para o caminho da sua imagem
            style={styles.container}
        >

            <TextInput
                placeholder="Cidade da Loja:"
                left={<TextInput.Icon icon="book-open" />}
                maxLength={40}
                style={styles.input}
                onChangeText={(texto) => setcidadeLoja(texto)}
                value={cidadeLoja}
            />
            <Separator />
            <TextInput
                placeholder="Endereco:"
                left={<TextInput.Icon icon="account" />}
                style={styles.input}
                onChangeText={(texto) => setendereco(texto)}
                value={endereco}
            />
            <Separator />
            <TextInput
                placeholder="CEP:"
                left={<TextInput.Icon icon="book-open-page-variant" />}
                style={styles.input}
                onChangeText={(texto) => setcep(texto)}
                value={cep}
            />
            <Separator />
            <TextInput
                placeholder="Tamanho da Loja:"
                left={<TextInput.Icon icon="ab-testing" />}
                style={styles.input}
                onChangeText={(texto) => settamanho(texto)}
                value={tamanho}
            />

            <Separator />
            <TextInput
                placeholder="Satisfação dos clientes:"
                left={<TextInput.Icon icon="cash" />}
                style={styles.input}
                onChangeText={(texto) => setsatisfacao(texto)}
                value={satisfacao}
            />
            <Separator />
            <TouchableOpacity onPress={insertUpdate} style={styles.button} activeOpacity={0.5}>
                <Text style={styles.buttonTextStyle}>Cadastrar</Text>
            </TouchableOpacity>
            <View>
            <Text style={styles.listar}>Listagem de Lojas</Text>
            </View>
            <View style={styles.lista}>
            <View style={styles.lista}>{loading ?
                            (<ActivityIndicator color="#121212" size={45} />) :
                            (<FlatList
                                    keyExtractor={item => item.key}
                                    data={shops}
                                    renderItem={({ item }) => (
                                            <ShopsList data={item} deleteItem={() =>  handleDeleteItem(item.key)}
                                            editItem={handleEdit} />
                                    )}
                                />
                            )
                        }</View>
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
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container1: {
        position:'absolute',
        zIndex: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:100,
        height:100,
        backgroundImag: 'url("../assets/apresentacao1.jpg")',
      },
      lista:{
        flex: 1,
        width:"90%",
        height:"auto",
        backgroundColor:"gray",
        flexDirection:"column",
        alignItems:"center",
        
      },
      button1: {
        padding: 10,
        backgroundColor: '#2196F3',
        color: 'white',
        borderRadius: 5,
      },
    container: {
        flex: 1,
        margin: 10,
        flexDirection:"column",
        alignItems:"center",
    },
    input: {
        width: "95%",
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
        textAlign: 'center',
        color:"white",
    }
}); 