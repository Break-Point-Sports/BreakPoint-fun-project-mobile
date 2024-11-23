import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions, StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { Button, IconButton, Card, Dialog, Portal, PaperProvider, TextInput, } from 'react-native-paper';
import { GET_LEAGUES_LAMBDA_URL, JOIN_LEAGUE_LAMBDA_URL } from '../util/Constants';
import { updateCurrentLeague } from '../redux/slices/userSlice';


const JoinLeagueDrawer = ({ joinLeagueRef }) => {
  const dispatch = useDispatch();
  const cognitoId = useSelector(state => state.user.cognitoId)

  const [activeLeagues, setActiveLeagues] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [buttonKey, setButtonKey] = useState('d')
  const [whichCardIsPurple, setWhichCardIsPurple] = useState(null);

  useEffect(() => {
    getActiveLeagues()
  }, [])

  const getActiveLeagues = async() => {
    const URI = GET_LEAGUES_LAMBDA_URL + '/?isActive=active';
    console.log("Fetching " + URI);
    const response = await fetch(URI, {method: 'GET'});
    const body = await response.json();
    console.log(body);
    setActiveLeagues(body);
  }

  const selectLeagueCard = async(index) => {
    setWhichCardIsPurple(index);
    setButtonDisabled(false);
    setButtonKey('nd')
  }

  const onButtonPress = async() => {
    setShowSignUpDialog(true);
  }

  const onClose = () =>{
    setButtonDisabled(true);
    setWhichCardIsPurple(null);
    setButtonKey('d')
    joinLeagueRef.current.close()
  }

  const onConfirmJoinLeague = async() => {
    const leagueId = activeLeagues[whichCardIsPurple].leagueId;
    console.log(`Adding ${cognitoId} to ${leagueId}`);
    const body = JSON.stringify({
      cognitoId: cognitoId,
      leagueId: leagueId
    })
    console.log(body);
    
    const response = await fetch(JOIN_LEAGUE_LAMBDA_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: body
    });

    if (response.status === 200) {
      dispatch(updateCurrentLeague(leagueId))
      setShowSignUpDialog(false);
      onClose()
    }
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
    <PaperProvider>
      <Portal>
        <Dialog 
          visible={showSignUpDialog} 
          onDismiss={() => setShowSignUpDialog(false)}
          dismissable={false}
        >
          <Dialog.Title>Confirm Purchase</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.leagueDetailsTxt}>League Details:</Text>
            <TextInput>
              
            </TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              onPress={() => setShowSignUpDialog(false)}>
                Cancel
            </Button>
            <Button 
              onPress={() => onConfirmJoinLeague()}>
                Confirm
            </Button>

          </Dialog.Actions>
        </Dialog>
      </Portal>
    
            <View
                style={styles.drawerHeader}
            >
      
                <IconButton
                  icon='close'
                  iconColor='#9C11E6'
                  size={30}
                  onPress={() => onClose()}
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
            {activeLeagues.map((item,index) => (
                <Card
                  onPress={() => selectLeagueCard(index)}
                  style={styles.card}
                  key={index}
                >

                <Card.Cover
                  source={
                    require('../../assets/denver_skyline.jpg')
                  }
                  style={whichCardIsPurple === index ? styles.cardCoverChosen : styles.cardCover}
                />
                <Card.Content
                  style={styles.cardContent}
                >
                <Card.Title
                    title={item.leagueId}
                    titleStyle={styles.cardTextTitle}
                    style={styles.cardText}
                  />
                </Card.Content>

              </Card>
            ))}
            </ScrollView>
            <View
              style={styles.buttonView}
            >
              {buttonDisabled ? 
              <Button 
                mode="contained" 
                style={styles.joinLeagueButtonDisabled}
                labelStyle={styles.joinLeagueButtonLabel}
                disabled={true}
                key={buttonKey}

              >
                {"Join Now"}
              </Button>
              :
              <Button 
                mode="contained" 
                onPress={() => onButtonPress()}
                style={styles.joinLeagueButton}
                labelStyle={styles.joinLeagueButtonLabel}
                key={buttonKey}
              >
                {"Join Now"}
              </Button>
            }
            </View>
  </PaperProvider>

  </RBSheet>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  cardContent: {
    height: 0,
    bottom: 70,
    alignItems: 'center',
    
  },
  card: {
    backgroundColor: 'clear',
  },
  cardChosen: {
    backgroundColor: '#9C11E6',
  },
  cardCover: {
    borderRadius: 0,
  },
  cardCoverChosen: {
    borderRadius: 0,
    backgroundColor: '#9C11E6',
  },
  cardText: {
    top: 8,
  },
  cardTextTitle: {
    color:'white'
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
  joinLeagueButton: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
    marginBottom: 20
  },
  joinLeagueButtonDisabled: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(156, 17, 230, 0.25)',
    justifyContent: 'center',
    marginBottom: 20,
  },
  joinLeagueButtonLabel: {
    fontSize: 18,
    color: '#fff',
  },
  leagueDetailsTxt: {
    fontSize: 20,
    marginBottom: 20
  }
})

export default JoinLeagueDrawer;