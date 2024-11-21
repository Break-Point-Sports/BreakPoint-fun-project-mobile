import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions, StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { TextInput, IconButton, Button } from 'react-native-paper';
import { GET_LEAGUES_LAMBDA_URL } from '../util/Constants';


const JoinLeagueDrawer = ({ joinLeagueRef }) => {
  const [activeLeagues, setActiveLeagues] = useState([]);

  useEffect(() => {
    getActiveLeagues()
  }, [])

  const getActiveLeagues = async() => {
    const URI = GET_LEAGUES_LAMBDA_URL + '/?isActive=active';
    console.log("Fetching " + URI);
    const response = await fetch(URI, {method: 'GET'});
    const body = await response.json();
    console.log(body);
  }

  return (
    <RBSheet
        ref={joinLeagueRef}
        closeOnPressMask={false}
        height={Dimensions.get('window').height}
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
                  iconColor='#9C11E6'
                  size={30}
                  onPress={() => joinLeagueRef.current.close()}
                  style={styles.closeButton}
                />
            </View>

            <Text
                style={styles.currentLeaguesText}
            > 
                Join a League
            </Text>
            <ScrollView
            >

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
  currentLeaguesText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20
  },
  drawerHeader: {
    marginTop: 50,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: '#9C11E6'
  },
  mainView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  messagingTextInput: {
    height: 100,
    width: '95%',
    alignSelf: 'center',
    marginBottom:10
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 300,
    width: 250,
    alignSelf: 'center',
    position: 'absolute',
    top: 50
  },
  modalScrollView: {
    height: 100,
    width: 100
  },
  sendMessageButton: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  sendMessageButtonLabel: {
    fontSize: 18,
    color: '#fff',
  },
  textInputAndButtonView: {
    marginBottom: 450,
    alignItems: 'center'
  },
  toText: {
    fontSize: 30,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  toTouchableOpacity: {
    height: 50
  }
})

export default JoinLeagueDrawer;