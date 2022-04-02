import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, TextInput, Surface, Headline, Snackbar  } from 'react-native-paper';


const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={styles.buttons}>
        <Button children="Sign in" mode="outlined" style={styles.button} onPress={() => navigation.navigate('Sign In')} />
        <Button children="Sign up" mode="contained" style={styles.button} onPress={() => navigation.navigate('Sign Up')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    flex: 1,
  },

  button: {
    marginTop: 10
  }
});

export default WelcomeScreen;