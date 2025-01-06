import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { updateTennisLevel } from '../../redux/slices/userSlice';
import { citySignUpScreenIdentifier, pictureSignUpScreenIdentifier } from '../../util/Constants';
import commonStyles from '../../util/CommonStyles';

const TennisLevelSignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const tennisLevel = useSelector(state => state.user.tennisLevel)

  return (
    <View
      style={styles.root}
    >
      <IconButton
        icon='arrow-left'
        iconColor={'#9C11E6'}
        size={40}
        style={commonStyles.leftArrowIcon}
        onPress={() => navigation.navigate(citySignUpScreenIdentifier)}
      />

      {tennisLevel === '' ? 
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
          onPress={() => navigation.navigate(pictureSignUpScreenIdentifier)}
        />
      }      
      <Text
        style={styles.whatsUrName}
      >
        What's your tennis level?
      </Text>
      <View
        style={styles.radioButtonView}
      >
        <Button
          textColor={ tennisLevel === 'beginner' ? 'white' : 'black' }
          buttonColor={ tennisLevel === 'beginner' ? '#9C11E6' : 'white' }
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
          textColor={ tennisLevel === 'intermediate' ? 'white' : 'black' }
          buttonColor={ tennisLevel === 'intermediate' ? '#9C11E6' : 'white' }
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
          textColor={ tennisLevel === 'competitive' ? 'white' : 'black' }
          buttonColor={ tennisLevel === 'competitive' ? '#9C11E6' : 'white' }
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
          textColor={ tennisLevel === 'advanced' ? 'white' : 'black' }
          buttonColor={ tennisLevel === 'advanced' ? '#9C11E6' : 'white' }
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
    borderColor: '#9C11E6',
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








