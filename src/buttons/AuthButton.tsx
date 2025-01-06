import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const AuthButton = ({onPress, buttonActive, label}) => {
  return (
    buttonActive? 
      <TouchableOpacity
        onPress={onPress}
      >
        <Button 
          mode="contained" 
          style={styles.submitButtonActive}
          labelStyle={styles.buttonLabel}
        >
        {label}
        </Button>
      </TouchableOpacity>

  
      :
      <Button 
        mode="contained"
        disabled={true} 
        style={styles.submitButtonInactive}
        labelStyle={styles.buttonLabel}
      >
        {label}
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