import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, TextInput, Surface, Headline, Snackbar  } from 'react-native-paper';


const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      onToggleSnackBar();
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
      onToggleSnackBar();
    }
  }

  //{!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
  return (
    <View style={styles.container}>
      

      <View style={styles.componentsGroup}>
        <TextInput
          placeholder='Email'
          style={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />

        <TextInput
          placeholder='Password'
          style={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
        />

        <Button mode="contained" children="Sign in" style={styles.control} onPress={signUp} />
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },

  componentsGroup: {
    padding: 8,
    //height: 100,
    //width: 100,
    //alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignUpScreen;