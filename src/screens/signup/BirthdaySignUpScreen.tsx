import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateBirthday } from '../../redux/slices/userSlice';
import DateTimePicker from '@react-native-community/datetimepicker';


const BirthdaySignUpScreen = () => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const birthday = useSelector(state => state.user.birthday);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    const dateToSave = selectedDate.getMonth() + '-' + selectedDate.getDate() + '-' + selectedDate.getFullYear()
    console.log(dateToSave)
    dispatch(updateBirthday(dateToSave))
  };

  return (
    <View
      style={styles.root}
    >
      <IconButton
        icon='arrow-right'
        color={'grey'}
        size={40}
        style={styles.arrowIcon}
        onPress={() => navigation.navigate('signup-gender')}
        disabled={birthday === '' ? true : false}
      />
      <Text
        style={styles.whatsUrBirthday}
      >
        What's your birthday?
      </Text>
      <DateTimePicker
        display='spinner'
        value={date}
        mode='date'
        onChange={onChange}
      />
    </View>
  )
}



const styles = StyleSheet.create({
  arrowIcon: {
    position: 'absolute',
    top: 20,
    right: 5,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  whatsUrBirthday: {
    fontSize: 24,
    alignSelf: 'center'
  },
})

export default BirthdaySignUpScreen;








