import { ScrollView, StyleSheet, View, Text } from "react-native"
import { Card, Button } from 'react-native-paper'
import {useState} from 'react'


const LadderScreen = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
    return (
      <View
        style={styles.rootView}
      >
            <Text
        style={styles.laddersText}
      > 
        Join a Ladder
      </Text>
        <ScrollView
          style={styles.scrollView}
        >
          <Card
            onPress={() => {}}
            style={styles.card}
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
                title="Beginner Ladder"
                titleStyle={styles.cardTextTitle}
                style={styles.cardText}
              />
            </Card.Content>

          </Card>
          <Card
            onPress={() => {}}
            style={styles.card}
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
                title="Intermediate Ladder"
                titleStyle={styles.cardTextTitle}
                style={styles.cardText}
              />
            </Card.Content>

          </Card>
          <Card
            onPress={() => {}}
            style={styles.card}
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
                onPress={() => {}}
                style={styles.joinLadderButtonDisabled}
                labelStyle={styles.joinLadderButtonLabel}
                disabled={true}
              >
                {"Join Now"}
              </Button>
              :
              <Button 
              mode="contained" 
              onPress={() => {}}
              style={styles.joinLadderButton}
              labelStyle={styles.joinLadderButtonLabel}
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
  }
})

export default LadderScreen;