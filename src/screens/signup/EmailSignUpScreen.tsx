import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'

import { updateEmail } from '../../redux/slices/userSlice';
import commonStyles from '../../util/CommonStyles';
import { lastNameSignUpScreenIdentifier, birthdaySignUpScreenIdentifier } from '../../util/Constants';
const EmailSignUpScree  = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
      keyboardVerticalOffset={10}
    >
      <IconButton
        icon='arrow-left'
        iconColor={'#9C11E6'}
        size={40}
        style={commonStyles.leftArrowIcon}
        onPress={() => navigation.navigate(lastNameSignUpScreenIdentifier)}
      />
      {email === '' ? 
      
        <IconButton
          icon='arrow-right'
          iconColor={'grey'}
          size={40}
          style={commonStyles.rightArrowIcon}
          disabled
        />
        :
        <IconButton
          icon='arrow-right'
          iconColor={'#9C11E6'}
          size={40}
          style={commonStyles.rightArrowIcon}
          onPress={() => navigation.navigate(birthdaySignUpScreenIdentifier)}
        />
      }
      <View
        style={styles.wrapperView}
      >
        <Text
          style={styles.whatsUrEmail}
        >
          What's your email?
        </Text>
        <TextInput
          autoFocus
          outlineColor='#9C11E6'
          activeOutlineColor='#9C11E6'
          mode='outlined'
          style={styles.textInput}
          value={email}
          onChangeText={(text) => dispatch(updateEmail(text))}
        />
      </View>
    </KeyboardAvoidingView>
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
  },
  textInput: {
    height: 50,
    width: 300,
    alignSelf: 'center',
    marginBottom: 50
  },
  whatsUrEmail: {
    fontSize: 24,
    alignSelf: 'center'
  },
  wrapperView: {
    height:'75%',
    width: '100%',
    justifyContent: 'flex-end',
  }
})

export default EmailSignUpScree;









