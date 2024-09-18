import { StyleSheet, Text, View } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { updateLastName } from '../../redux/slices/userSlice';

const LastNameSignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const lastName = useSelector(state => state.user.lastName)

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
        disabled={lastName === '' ? true : false}
      />
      <Text
        style={styles.whatsUrName}
      >
        What's your last name?
      </Text>
      <TextInput
        mode='outlined'
        style={styles.textInput}
        value={lastName}
        onChangeText={(text) => dispatch(updateLastName(text))}
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

export default LastNameSignUpScreen;









