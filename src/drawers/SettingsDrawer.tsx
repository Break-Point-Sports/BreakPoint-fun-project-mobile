import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions, StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { Button, IconButton } from 'react-native-paper';
// import Slider from '@react-native-community/slider';



const SettingsDrawer = ({ settingsRef }) => {
  const phoneNumber = useSelector(state => state.user.phoneNumber)

  const navigation = useNavigation(); 



  return (
    <RBSheet
    ref={settingsRef}
    closeOnPressMask={false}
    height={Dimensions.get('window').height * 0.95}
    customStyles={{
      wrapper: {
        backgroundColor: "transparent"
      },
      draggableIcon: {
        backgroundColor: "#000"
      }
    }}
  >
    <View
      style={styles.drawerHeader}
    >
        <IconButton
          icon='close'
          color='#9C11E6'
          size={30}
          onPress={() => settingsRef.current.close()}
          style={styles.closeButton}
        />
      <Text
        style={styles.settingsText}
      >
        Settings
      </Text>
    </View>

    <ScrollView>

    <Button
      style={styles.locationButton}
      labelStyle={styles.label}
    >
      Location: {'Denver'}, {'CO'}
    </Button>
    <Button
      style={styles.button}
      labelStyle={styles.label}
    >
      Phone Number: {phoneNumber}
    </Button>

    <Button
      style={styles.deleteButton}
      labelStyle={styles.deleteButtonLabel}
    >
      Delete Account
    </Button>
    </ScrollView>
  </RBSheet>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
    alignItems: 'flex-start'
  },
  closeButton: {
    position: 'absolute',
    left: 5
  },
  deleteButton: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
  },
  deleteButtonLabel: {
    color: 'red'
  },
  drawerHeader: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: '#9C11E6'
  },
  locationButton: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
    alignItems: 'flex-start',
  },
  settingsText: {
    fontSize: 25,
    color: '#9C11E6'
  },
})

export default SettingsDrawer;