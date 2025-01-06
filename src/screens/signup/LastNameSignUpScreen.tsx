import { StyleSheet, Text, View, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'

import { updateLastName } from '../../redux/slices/userSlice';
import commonStyles from '../../util/CommonStyles';
import { firstNameSignUpScreenIdentifier, emailSignUpScreenIdentifier } from '../../util/Constants';

const LastNameSignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const lastName = useSelector(state => state.user.lastName)

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
        onPress={() => navigation.navigate(firstNameSignUpScreenIdentifier)}
      />
      {lastName === '' ? 
      
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
          onPress={() => navigation.navigate(emailSignUpScreenIdentifier)}
        />
      }
      <View
        style={styles.wrapperView}
      >

        <Text
          style={styles.whatsUrName}
        >
          What's your last name?
        </Text>
        <TextInput
          autoFocus
          outlineColor='#9C11E6'
          activeOutlineColor='#9C11E6'
          mode='outlined'
          style={styles.textInput}
          value={lastName}
          onChangeText={(text) => dispatch(updateLastName(text))}
        />
      </View>

    </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create({
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
  whatsUrName: {
    fontSize: 24,
    alignSelf: 'center'
  },
  wrapperView: {
    height:'75%',
    width: '100%',
    justifyContent: 'flex-end',
  }
})

export default LastNameSignUpScreen;









