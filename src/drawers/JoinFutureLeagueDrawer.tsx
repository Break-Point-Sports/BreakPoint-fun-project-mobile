import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions, StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { TextInput, IconButton, Button, Card } from 'react-native-paper';
import { GET_LEAGUES_LAMBDA_URL } from '../util/Constants';



const JoinFutureLeagueDrawer = ({ joinFutureLeagueRef }) => {
  const [futureLeagues, setFutureLeagues] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    getFutureLeagues()
  }, [])

  const getFutureLeagues = async() => {
    const URI = GET_LEAGUES_LAMBDA_URL + '/?isActive=future';
    console.log("Fetching " + URI);
    const response = await fetch(URI, {method: 'GET'});
    const body = await response.json();
    console.log(body);
    setFutureLeagues(body)
  }

  return (
    <RBSheet
        ref={joinFutureLeagueRef}
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
                  onPress={() => joinFutureLeagueRef.current.close()}
                  style={styles.closeButton}
                />
            </View>

            <Text
                style={styles.currentLeaguesText}
            > 
                Join an Upcoming League
            </Text>
            <ScrollView
            >
              {futureLeagues.map((item,index) => (
                <Card
                  onPress={() => {}}
                  style={styles.card}
                  key={index}
                >

                <Card.Cover
                  source={
                    require('../../assets/denver_skyline.jpg')
                  }
                  style={styles.cardCover}
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
                            onPress={() => {}}
                            style={styles.joinLeagueButtonDisabled}
                            labelStyle={styles.joinLeagueButtonLabel}
                            disabled={true}
                          >
                            {"Join Now"}
                          </Button>
              :
              
              <Button 
              mode="contained" 
              onPress={() => {}}
              style={styles.joinLeagueButton}
              labelStyle={styles.joinLeagueButtonLabel}
            >
              {"Join Now"}
            </Button>
              }

            </View>

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
  cardCover: {
    borderRadius: 0,
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
    marginBottom: 20
  },
  joinLeagueButtonLabel: {
    fontSize: 18,
    color: '#fff',
  },
})

export default JoinFutureLeagueDrawer;