import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const AuthButton = ({onPress, buttonActive}) => {
  return (
    buttonActive? 
      <Button 
      mode="contained" 
      onPress={onPress}
      style={styles.submitButtonActive}
      labelStyle={styles.buttonLabel}
    >
      Login/Signup
    </Button>
  
      :
      <Button 
      mode="contained"
      disabled={true} 
      style={styles.submitButtonInactive}
      labelStyle={styles.buttonLabel}
    >
        Login/Signup
    </Button>
  )
};

const styles = StyleSheet.create({
  submitButtonActive: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9C11E6',
    justifyContent: 'center',
  },
  submitButtonInactive: {
    display: 'flex',
    width: 320,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(156, 17, 230, 0.25)',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 18,
    color: '#fff',
  },
});

export default AuthButton;