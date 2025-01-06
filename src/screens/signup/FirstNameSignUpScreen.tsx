import { StyleSheet, Text, KeyboardAvoidingView, Platform, View } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'

import { updateFirstName } from '../../redux/slices/userSlice';
import commonStyles from '../../util/CommonStyles';
import { lastNameSignUpScreenIdentifier } from '../../util/Constants';

const FirstNameSignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const firstName = useSelector(state => state.user.firstName)

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.root}
        keyboardVerticalOffset={10}
      >
      {firstName === '' ? 
      
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
          onPress={() => navigation.navigate(lastNameSignUpScreenIdentifier)}
        />
    }
      <View
        style={styles.wrapperView}
        >
      <Text
        style={styles.whatsUrName}
      >
        What's your first name?
      </Text>
      <TextInput
        outlineColor='#9C11E6'
        activeOutlineColor='#9C11E6'
        mode='outlined'
        style={styles.textInput}
        value={firstName}
        onChangeText={(text) => dispatch(updateFirstName(text))}
        autoFocus
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
    borderColor: '#9C11E6',
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

export default FirstNameSignUpScreen;









