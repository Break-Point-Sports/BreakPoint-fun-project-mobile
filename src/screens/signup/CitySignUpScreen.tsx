import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { updateCity } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const CitySignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const gender = useSelector(state => state.user.city)

  return (
    <View
      style={styles.root}
    >
      <IconButton
        icon='arrow-right'
        color={'grey'}
        size={40}
        style={styles.arrowIcon}
        onPress={() => navigation.navigate('signup-level')}
        disabled={gender === '' ? true : false}
      />
      <Text
        style={styles.whatsUrName}
      >
        What city are you in (we are only in Denver currently)?
      </Text>
      <View
        style={styles.radioButtonView}
      >
        <Button
          mode={ gender === 'denver' ? 'contained' : 'outlined' }
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








