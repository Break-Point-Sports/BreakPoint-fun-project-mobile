import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const ShoppingScreen = () => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  const dispatch = useDispatch();

  return (
    <View
      style={styles.root}
    > 
      <ScrollView
        style={styles.scrollView}
      >
    <Card
      style={styles.merchItemCard}
    >
      <Card.Cover source={{ uri: 'https://shirtz.cool/cdn/shop/files/1_d73c055e-6e94-4b0b-9e39-174a5f899d80_1200x.jpg?v=1693553118' }} />
      <Card.Actions
      >
        <Button>
          Buy Now
        </Button>
      </Card.Actions>
    </Card>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  merchItemCard: {
    width: '50%'
  },
  scrollView: {
    display:'flex',
    flexDirection: 'column',
    width: '100%'
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: 30,
    marginLeft:5
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
})
export default ShoppingScreen;



