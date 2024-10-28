import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const ShoppingScreen = () => {
  const cognitoId = useSelector(state => state.user.cognitoId)
  const dispatch = useDispatch();

  return (
    <View
      style={styles.root}
    > 
      <Text
        style={styles.text}
      >
        Merch
      </Text>
      
            <ScrollView
              style={styles.scrollView}
            >
            </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
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



