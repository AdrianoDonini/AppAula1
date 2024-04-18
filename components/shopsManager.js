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
    const regexNumber = /^[0-5]$/;
    if((regexNumber.test(tamanho)) == false){
        alert("Digite valores de 0 a 5 no campo Tamanho da loja!");
        return
    }
    if((regexNumber.test(satisfacao)) == false){
        alert("Digite valores de 0 a 5 no campo Satisfação do cliente!");
        return
    }

    if((regexNumber.test(tamanho) && (regexNumber.test(satisfacao)))){
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
        <View style={styles.container}>

            <TextInput
                placeholder="Cidade da Loja:"
                left={<TextInput.Icon icon="city" />}
                maxLength={40}
                style={styles.input}
                onChangeText={(texto) => setcidadeLoja(texto)}
                value={cidadeLoja}
            />
            <Separator />
            <TextInput
                placeholder="Endereco:"
                left={<TextInput.Icon icon="map-marker" />}
                style={styles.input}
                onChangeText={(texto) => setendereco(texto)}
                value={endereco}
            />
            <Separator />
            <TextInput
                placeholder="CEP:"
                left={<TextInput.Icon icon="map" />}
                style={styles.input}
                onChangeText={(texto) => setcep(texto)}
                value={cep}
            />
            <Separator />
            <TextInput
                placeholder="Tamanho da Loja:"
                left={<TextInput.Icon icon="storefront" />}
                style={styles.input}
                onChangeText={(texto) => settamanho(texto)}
                value={tamanho}
            />

            <Separator />
            <TextInput
                placeholder="Satisfação dos clientes:"
                left={<TextInput.Icon icon="emoticon-happy" />}
                style={styles.input}
                onChangeText={(texto) => setsatisfacao(texto)}
                value={satisfacao}
            />
            <Separator />
            <TouchableOpacity onPress={insertUpdate} style={styles.button} activeOpacity={0.5}>
                <Text style={styles.buttonTextStyle}>Cadastrar</Text>
            </TouchableOpacity>
            <View>
            <Text style={styles.lista}>Listagem de Lojas</Text>
            </View>
            <View style={styles.listar}>
                <View style={styles.flatList}>
                        {loading ?
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
        width:"100%",
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
        width:"100vw",
        flex:1,
        flexDirection:"column",
        alignItems:"center",
    },
    flatList:{
        flex: 1,
        width: "90vw",
        height:"auto",
        backgroundColor:"gray",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
      },
}); 