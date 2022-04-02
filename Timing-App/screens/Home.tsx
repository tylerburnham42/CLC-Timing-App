import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth, signOut } from "firebase/auth";
import { Button, TextInput, Surface, Headline, Snackbar  } from 'react-native-paper';


const auth = getAuth();

export default function HomeScreen() {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>

      <Button children="Sign Out" mode="contained" style={styles.button} onPress={() => signOut(auth)} />

    </View>
  );
}

const styles = StyleSheet.create({

  button: {
    margin: 8,
    //height: 80,
    //width: 80,
    //alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});