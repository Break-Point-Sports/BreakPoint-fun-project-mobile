import { View, StyleSheet } from "react-native";
import { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Header from '../random/Header'
import PageNavigator from "./PageNavigator";

const BottomNavigatorCustom = ({ navigation }) => {
  const dispatch = useDispatch()
  const [index, setIndex] = useState(1);

  const handleClick = (newIndex) => {
    switch(newIndex) {
      case 0:
        navigation.navigate('profile')
        break
      case 1: 
        navigation.navigate('leagues')
        break
      case 2:
        navigation.navigate('messaging')
        break
      case 3:
        navigation.navigate('shopping')
        break
    }
    setIndex(newIndex);
  }

  return (
    <View
      style={styles.root}
    >
      <Header />
        <PageNavigator/>
      <View
        style={styles.footer}
      >
        <IconButton
          icon='account'
          iconColor={index === 0 ? '#9C11E6': 'grey'}
          size={40}
          style={styles.settingsIcon}
          onPress={() => handleClick(0)}
        />
        <IconButton
          icon='tennis'
          iconColor={index === 1 ? '#9C11E6': 'grey'}
          size={40}
          style={styles.settingsIcon}
          onPress={() => handleClick(1)}
        />
        <IconButton
          icon='message'
          iconColor={index === 2 ? '#9C11E6': 'grey'}
          size={40}
          style={styles.settingsIcon}
          onPress={() => handleClick(2)}
        />
        <IconButton
          icon='shopping'
          iconColor={index === 3 ? '#9C11E6': 'grey'}
          size={40}
          style={styles.settingsIcon}
          onPress={() => handleClick(3)}
        />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 100,
    backgroundColor: 'white',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  settingsIcon: {
    
  }
  
})

export default BottomNavigatorCustom;