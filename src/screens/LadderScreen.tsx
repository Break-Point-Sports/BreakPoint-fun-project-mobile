import { ScrollView, StyleSheet } from "react-native"
import { Card } from 'react-native-paper'


const LadderScreen = () => {
    return (
        <ScrollView
          style={styles.rootView}
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
    )
}

const styles = StyleSheet.create({
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
  rootView: {
    backgroundColor: 'white',
    flex: 1
  }
})

export default LadderScreen;