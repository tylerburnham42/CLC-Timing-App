import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button, TextInput, Surface, Headline, Snackbar  } from 'react-native-paper';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);


  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      onToggleSnackBar();

      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  //{!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
  return (
    <View style={styles.container}>
      <View style={styles.view}>
      <TextInput style={styles.textBoxes}
        placeholder='Email'
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}

      />

      <TextInput style={styles.textBoxes}
        placeholder='Password'
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry={true}
      />

      <Button mode="contained" children="Sign in" onPress={signIn} style={styles.button} />
    </View>
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'Dismiss',
        onPress: () => {
          onDismissSnackBar();
        },
      }}>
      {value.error}
    </Snackbar>
    
    </View>

  );
}

const styles = StyleSheet.create({
  view: {
    padding: 8,
    //height: 100,
    //width: 100,
    //alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  textBoxes: {
    margin: 8,
    //height: 80,
    //width: 80,
    //alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
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

export default SignInScreen;