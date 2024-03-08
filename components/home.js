import { StyleSheet, View, Image, Button } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
      style={styles.logo}
      source= {require('../assets/loginIMG.png')}
      />
      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#778899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 330,
    height: 300,
    paddingTop: 10
  }
});