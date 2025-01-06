import { StyleSheet, Text, View } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { updateGender } from '../../redux/slices/userSlice';
import commonStyles from '../../util/CommonStyles';
import { birthdaySignUpScreenIdentifier, citySignUpScreenIdentifier } from '../../util/Constants';

const GenderSignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const gender = useSelector(state => state.user.gender)

  return (
    <View
      style={styles.root}
    >
      <IconButton
        icon='arrow-left'
        iconColor={'#9C11E6'}
        size={40}
        style={commonStyles.leftArrowIcon}
        onPress={() => navigation.navigate(birthdaySignUpScreenIdentifier)}
      />
      {gender === '' ? 
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
          onPress={() => navigation.navigate(citySignUpScreenIdentifier)}
        />
      }
      <Text
        style={styles.whatsUrName}
      >
        What's your gender?
      </Text>
      <View
        style={styles.radioButtonView}
      >
        <Button
          textColor={ gender === 'male' ? 'white' : 'black' }
          buttonColor={ gender === 'male' ? '#9C11E6' : 'white' }
          mode={ gender === 'male' ? 'contained' : 'outlined' }
          style={styles.button}
          onPress={() => dispatch(updateGender('male'))}
        >
         Male
        </Button>
      </View>

      <View
        style={styles.radioButtonView}
      >
        <Button
          textColor={ gender === 'female' ? 'white' : 'black' }
          buttonColor={ gender === 'female' ? '#9C11E6' : 'white' }
          mode={ gender === 'female' ? 'contained' : 'outlined' }
          style={styles.button}
          onPress={() => dispatch(updateGender('female'))}
        >
         Female
        </Button>
      </View>
      <View
        style={styles.radioButtonView}
      >
        <Button
          textColor={ gender === 'non-binary' ? 'white' : 'black' }
          buttonColor={ gender === 'non-binary' ? '#9C11E6' : 'white' }
          mode={ gender === 'non-binary' ? 'contained' : 'outlined' }
          style={styles.button}
          onPress={() => dispatch(updateGender('non-binary'))}
        >
         Non-Binary
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

export default GenderSignUpScreen;








