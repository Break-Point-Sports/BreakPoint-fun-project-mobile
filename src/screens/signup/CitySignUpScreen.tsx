import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { updateCity } from '../../redux/slices/userSlice';
import { genderSignUpScreenIdentifier, levelSignUpScreenIdentifier } from '../../util/Constants';
import commonStyles from '../../util/CommonStyles';

const CitySignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const city = useSelector(state => state.user.city)

  return (
    <View
      style={styles.root}
    >      
      <IconButton
        icon='arrow-left'
        iconColor={'#9C11E6'}
        size={40}
        style={commonStyles.leftArrowIcon}
        onPress={() => navigation.navigate(genderSignUpScreenIdentifier)}
      />
      {city === '' ? 
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
          onPress={() => navigation.navigate(levelSignUpScreenIdentifier)}
        />
      }
      <Text
        style={styles.whatsUrName}
      >
        What city are you in (we are only in Denver currently)?
      </Text>
      <View
        style={styles.radioButtonView}
      >
        <Button
          textColor={ city === 'denver' ? 'white' : 'black' }
          buttonColor={ city === 'denver' ? '#9C11E6' : 'white' }
          mode={ city === 'denver' ? 'contained' : 'outlined' }
          style={styles.button}
          onPress={() => dispatch(updateCity('denver'))}
        >
         Denver
        </Button>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  arrowIcon: {
    position: 'absolute',
    top: 20,
    right: 5,
  },
  button: {
    width: 250,
    marginBottom: 10,
    borderColor: '#9C11E6',
  },
  radioButtonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  whatsUrName: {
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 10,
  },
})

export default CitySignUpScreen;








