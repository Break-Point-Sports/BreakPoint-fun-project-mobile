import { StyleSheet, Text, View } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { updateName } from '../redux/slices/userSlice';

const NameSignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const firstName = useSelector(state => state.user.name)

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
        disabled={firstName === '' ? true : false}
      />
      <Text
        style={styles.whatsUrName}
      >
        What's your first name?
      </Text>
      <TextInput
        mode='outlined'
        style={styles.textInput}
        value={firstName}
        onChangeText={(text) => dispatch(updateName(text))}
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
  whatsUrName: {
    fontSize: 24,
    alignSelf: 'center'
  },
})

export default NameSignUpScreen;









