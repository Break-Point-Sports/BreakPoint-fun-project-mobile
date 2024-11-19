import { StyleSheet, Text, View } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { updateEmail } from '../../redux/slices/userSlice';

const EmailSignUpScree  = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email)

  return (
    <View
      style={styles.root}
    >
      <IconButton
        icon='arrow-right'
        iconColor={'grey'}
        size={40}
        style={styles.arrowIcon}
        onPress={() => navigation.navigate('signup-birthday')}
        disabled={email === '' ? true : false}
      />
      <Text
        style={styles.whatsUrEmail}
      >
        What's your email?
      </Text>
      <TextInput
        mode='outlined'
        style={styles.textInput}
        value={email}
        onChangeText={(text) => dispatch(updateEmail(text))}
      />
    </View>
  )
}



const styles = StyleSheet.create({
  arrowIcon: {
    position: 'absolute',
    top: 20,
    right: 5,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    width: 300,
    alignSelf: 'center',
  },
  whatsUrEmail: {
    fontSize: 24,
    alignSelf: 'center'
  },
})

export default EmailSignUpScree;









