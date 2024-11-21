import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { updateGender } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const GenderSignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const gender = useSelector(state => state.user.gender)

  return (
    <View
      style={styles.root}
    >
      <IconButton
        icon='arrow-right'
        color={'grey'}
        size={40}
        style={styles.arrowIcon}
        onPress={() => navigation.navigate('signup-city')}
        disabled={gender === '' ? true : false}
      />
      <Text
        style={styles.whatsUrName}
      >
        What's your gender?
      </Text>
      <View
        style={styles.radioButtonView}
      >
        <Button
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








