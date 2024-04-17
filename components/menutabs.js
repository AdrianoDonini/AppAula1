import * as React from 'react'; 
import { View, StyleSheet, Text} from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProductsManager from './productsmanager'; 
import Teste from './test';
import ShopsManager from './shopsManager';

 
function HomeScreen() { 
    return ( 
        <View style={styles.container}> 
            <Card style={styles.Cards}>

                <Card.Cover style={styles.imgCards} source={require('../assets/imgP1.png')} />
                <Text># Mushoku Tensei Volume 7</Text>
                <Text>R$ 35,90</Text>
                <Card.Content>
                <Button 
                    textColor='#3838ed'                    
                    style={styles.styleButtonComprar}
                    title="Comprar"
                    onPress={() => Alert.alert('Função em desenvolvimento!')}>Comprar</Button>
                     <Button 
                    textColor='#fff'                    
                    style={styles.styleButtonEspecificacaoes}
                    title="Especificações"
                    onPress={() => Alert.alert('Função em desenvolvimento!')}>Especificações</Button>
                </Card.Content>
            </Card> 
                        <Card style={styles.Cards}>

                <Card.Cover style={styles.imgCards} source={require('../assets/imgP1.png')} />
                <Text># Mushoku Tensei Volume 7</Text>
                <Text>R$ 35,90</Text>
                <Card.Content>
                <Button 
                    textColor='#3838ed'                    
                    style={styles.styleButtonComprar}
                    title="Comprar"
                    onPress={() => Alert.alert('Função em desenvolvimento!')}>Comprar</Button>
                     <Button 
                    textColor='#fff'                    
                    style={styles.styleButtonEspecificacaoes}
                    title="Especificações"
                    onPress={() => Alert.alert('Função em desenvolvimento!')}>Especificações</Button>
                </Card.Content>
            </Card> 
            <Card style={styles.Cards}>

                <Card.Cover style={styles.imgCards} source={require('../assets/imgP1.png')} />
                <Text># Mushoku Tensei Volume 7</Text>
                <Text>R$ 35,90</Text>
                <Card.Content>
                <Button 
                    textColor='#3838ed'                    
                    style={styles.styleButtonComprar}
                    title="Comprar"
                    onPress={() => Alert.alert('Função em desenvolvimento!')}>Comprar</Button>
                    <Button 
                    textColor='#fff'                    
                    style={styles.styleButtonEspecificacaoes}
                    title="Especificações"
                    onPress={() => Alert.alert('Função em desenvolvimento!')}>Especificações</Button>
                </Card.Content>
        </Card> 
        </View> 
    ); 
} 
 
function Lojas() { 
    return <ShopsManager/>
} 
 
function ProdutsScreen() { 
    return <ProductsManager/>
     
 
} 
 
function NotificationsScreen() { 
    return <Teste/>
} 
 
const Tab = createBottomTabNavigator(); 
 
export default function Menu() { 
    return ( 
        <NavigationContainer > 
            <Tab.Navigator style={styles.menuStyle}
                screenOptions={({ route }) => ({ 
                    tabBarIcon: ({ color, size }) => { 
                        
                        let iconName; 
 
                        switch (route.name) { 
                            case 'Home': 
                                iconName = 'home'; 
                                break; 
                            case 'Lojas': 
                                iconName = 'shopping-bag'; 
                                break; 
                            case 'Mangas': 
                                iconName = 'book-open'; 
                                break; 
                            case 'Notificações': 
                                iconName = 'bell'; 
                                break; 
                            default: 
                                iconName = 'add-circle-outline'; 
                                break; 
                        } 
 
                        return <Icon name={iconName} size={size} color={color} />; 
                    }, 
                })} 
                tabBarOptions={{ 
                    activeTintColor: '#777', 
                    inactiveTintColor: '#3838ed', 
                    showLabel: true, 
                }} 
                
            > 
                <Tab.Screen name="Home" component={HomeScreen} style={styles.tabScrew}/> 
                <Tab.Screen name="Lojas" component={Lojas} /> 
                <Tab.Screen 
                    name="Mangas" 
                    component={ProdutsScreen} 
                /> 
                <Tab.Screen name="Notificações" component={NotificationsScreen} /> 
                </Tab.Navigator> 
        </NavigationContainer> 
    ); 
} 
 
const styles = StyleSheet.create({ 
    tabScrew:{
        backgroundColor:"blue",
    },
    container: { 
        flex: 1, 

        alignItems: 'center',
        backgroundColor:"#bbb", 
    }, 

    iconTabRound: { 
        width: 60, 
        height: 90, 
        borderRadius: 30, 
        marginBottom: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        elevation: 6, 
        shadowColor: '#9C27B0', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 5,
        backgroundColor:"#eee",  
    },

    Cards: {
        width: 200,
        height: "auto",
        alignItems:"center",
        paddingTop: 10,
        paddingBottom: 10,
        margin: 10,
      },
      imgCards:{
        width: '100%',
        height: 'auto',
      },
    menuStyle:{
        backgroundColor:"bbb342",
        color:'read',
    },
    styleButtonComprar:{
        width: 80,
        height: 20,
        backgroundColor: "#ffe70f",
        alignItems:"center",
        justifyContent:"center",
        marginBottom: 10,
        marginTop:10,
    },
    styleButtonEspecificacaoes:{
        backgroundColor:"#3838ed",
        alignItems:"center",
        justifyContent:"center",
        width: 100,
        height: 20,
   } 
}); //Adr@gmail.com