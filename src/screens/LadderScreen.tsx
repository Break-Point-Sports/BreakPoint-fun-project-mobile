import { ScrollView, StyleSheet, View, Text } from "react-native"
import { Card, Button, Dialog, Portal, PaperProvider, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { JOIN_LADDER_LAMBDA_URL } from '../util/Constants'
import { updateCurrentLadder } from "../redux/slices/userSlice";

const LadderScreen = () => {
  const dispatch = useDispatch();
  const cognitoId = useSelector(state => state.user.cognitoId)
  const currentLadder = useSelector(state => state.user.currentLadder)

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [buttonKey, setButtonKey] = useState('d')
  const [whichCardIsPurple, setWhichCardIsPurple] = useState(null);

  const selectLadderCard = async(whichLadder) => {
    setWhichCardIsPurple(whichLadder);
    setButtonDisabled(false);
    setButtonKey('nd')
  }

  const onButtonPress = async() => {
    setShowSignUpDialog(true);
  }

  const onConfirmJoinLadder = async() => {
    const ladderId = whichCardIsPurple;
    console.log(`Adding ${cognitoId} to ${ladderId}`);
    const body = JSON.stringify({
      cognitoId: cognitoId,
      ladderId: ladderId,
    })
    console.log(body);
    
    const response = await fetch(JOIN_LADDER_LAMBDA_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: body
    });

    if (response.status === 200) {
      dispatch(updateCurrentLadder(ladderId))
      setShowSignUpDialog(false);
    }
  }
    return (
      <View
        style={styles.rootView}
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
              <Text style={styles.ladderDetailsText}
              >
                Ladder Details:
              </Text>
              <TextInput>
              
              </TextInput>
            </Dialog.Content>
            <Dialog.Actions>
              <Button 
                onPress={() => setShowSignUpDialog(false)}
              >
                Cancel
              </Button>
            <Button 
              onPress={() => onConfirmJoinLadder()}
            >
                Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
        {
          currentLadder === 'none' ?
          <>
          <Text
            style={styles.laddersText}
          > 
          Join a Ladder
        </Text>
        <ScrollView
          style={styles.scrollView}
        >
          <Card
            onPress={() => selectLadderCard('beginner')}
            style={styles.card}
          >

            <Card.Cover
              source={
                require('../../assets/denver_skyline.jpg')
              }
              style={whichCardIsPurple === 'beginner' ? styles.cardCoverChosen : styles.cardCover}

            />
            <Card.Content
              style={styles.cardContent}
            >
            <Card.Title
                title="Beginner Ladder"
                titleStyle={styles.cardTextTitle}
                style={styles.cardText}
              />
            </Card.Content>

          </Card>
          <Card
            onPress={() => selectLadderCard('intermediate')}
            style={styles.card}
          >

            <Card.Cover
              source={
                require('../../assets/denver_skyline.jpg')
              }
              style={whichCardIsPurple === 'intermediate' ? styles.cardCoverChosen : styles.cardCover}
            />
            <Card.Content
              style={styles.cardContent}
            >
            <Card.Title
                title="Intermediate/Competitive Ladder"
                titleStyle={styles.cardTextTitle}
                style={styles.cardText}
              />
            </Card.Content>

          </Card>
          <Card
            onPress={() => selectLadderCard('advanced')}

            style={styles.card}
          >

            <Card.Cover
              source={
                require('../../assets/denver_skyline.jpg')
              }
              style={whichCardIsPurple === 'advanced' ? styles.cardCoverChosen : styles.cardCover}
            />
            <Card.Content
              style={styles.cardContent}
            >
            <Card.Title
                title="Advanced Ladder"
                titleStyle={styles.cardTextTitle}
                style={styles.cardText}
              />
            </Card.Content>

          </Card>
        </ScrollView>
        <View
              style={styles.buttonView}
            >
              {buttonDisabled ?
              
              <Button 
                mode="contained" 
                style={styles.joinLadderButtonDisabled}
                labelStyle={styles.joinLadderButtonLabel}
                disabled={true}
              >
                {"Join Now"}
              </Button>
              :
              <Button 
              mode="contained" 
              onPress={() => onButtonPress()}
              style={styles.joinLadderButton}
              labelStyle={styles.joinLadderButtonLabel}
              key={buttonKey}
            >
              {"Join Now"}
            </Button>
            }

              <Button 
                mode="contained" 
                onPress={() => {}}
                style={styles.joinLadderButton}
                labelStyle={styles.joinLadderButtonLabel}
              >
                {"How it works"}
              </Button>
            </View>
            </>
          :
          <>
            <Text
              style={styles.laddersText}
            >  
              Ladder Play
            </Text>
            <View
              style={styles.laddderInfoView}
            >
              <View
                style={styles.textRow}
              >
                <Text
                  style={styles.ladderInfoText}
                >
                  Level:
                </Text>
              </View>
              <View
                style={styles.textRow}
              >
                <Text
                  style={styles.ladderInfoText}
                >
                  Current Ranking:
                </Text>
              </View>
              </View>
              </>
        }
        </PaperProvider>
        </View>
    )
}

const styles = StyleSheet.create({
  buttonView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 5
  },
  cardContent: {
    height: 0,
    bottom: 70,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'clear',
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
  joinLadderButton: {
    display: 'flex',
    width: '45%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
  },
  joinLadderButtonDisabled: {
    display: 'flex',
    width: '45%',
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(156, 17, 230, 0.25)',
    justifyContent: 'center',
  },
  joinLadderButtonLabel: {
    fontSize: 18,
    color: '#fff',
  },
  ladderInfoText: {
    fontSize: 20
  },
  ladderDetailsText: {
    fontSize: 20,
    marginBottom: 20
  },
  laddderInfoView: {
    borderWidth: 1,
    borderColor: '#9C11E6',
    margin: 10,
    padding: 10,
    borderRadius: 10
  },
  laddersText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20
  },
  rootView: {
    height: '100%',
    backgroundColor: 'white'
  },
  scrollView: {
    backgroundColor: 'white',
    flex: 1
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default LadderScreen;