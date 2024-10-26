import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { updateTennisLevel } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const TennisLevelSignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const tennisLevel = useSelector(state => state.user.tennisLevel)

  return (
    <View
      style={styles.root}
    >
      <IconButton
        icon='arrow-right'
        color={'grey'}
        size={40}
        style={styles.arrowIcon}
        onPress={() => navigation.navigate('signup-picture')}
        disabled={tennisLevel === '' ? true : false}
      />
      <Text
        style={styles.whatsUrName}
      >
        What's your tennis level?
      </Text>
      <View
        style={styles.radioButtonView}
      >
        <Button
          mode={ tennisLevel === 'beginner' ? 'contained' : 'outlined' }
          style={styles.button}
          onPress={() => dispatch(updateTennisLevel('beginner'))}
        >
         Beginner (1.5-1.9)
        </Button>
      </View>

      <View
        style={styles.radioButtonView}
      >
        <Button
          mode={ tennisLevel === 'intermediate' ? 'contained' : 'outlined' }
          style={styles.button}
          onPress={() => dispatch(updateTennisLevel('intermediate'))}
        >
         Intermediate (2.0-2.9)
        </Button>
      </View>
      <View
        style={styles.radioButtonView}
      >
        <Button
          mode={ tennisLevel === 'competitive' ? 'contained' : 'outlined' }
          style={styles.button}
          onPress={() => dispatch(updateTennisLevel('competitive'))}
        >
         Competitive (3.0-3.9)
        </Button>
      </View>
      <View
        style={styles.radioButtonView}
      >
        <Button
          mode={ tennisLevel === 'advanced' ? 'contained' : 'outlined' }
          style={styles.button}
          onPress={() => dispatch(updateTennisLevel('advanced'))}
        >
         Advanced (4.0+)
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

export default TennisLevelSignUpScreen;








