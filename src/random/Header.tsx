import { StyleSheet, Image, View } from 'react-native';

const Header = () => {

  return (
    <View
      style={styles.root}
    >
      <Image
        source={require('../../assets/splash.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: 44,
    width: 200,
    height: 45,
  },
  menuIcon: {
    position: 'absolute',
    left: 5,
    alignSelf: 'center',
    top: 34
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 110,
    backgroundColor: 'white',
  },
  settingsIcon: {
    position: 'absolute',
    right: 5,
    alignSelf: 'center',
    top: 34
  },
  text: {
    marginTop: 26,
    alignSelf: 'center',
    fontSize: 24,
  }
})

export default Header;