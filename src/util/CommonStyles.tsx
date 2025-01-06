import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    left: 5
  },
  drawerHeader: {
    marginTop: 50,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeaderText: {
    fontSize: 25,
  },
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  leftArrowIcon: {
    position: 'absolute',
    top: 20,
    left: 5,
  },
  rightArrowIcon: {
    position: 'absolute',
    top: 20,
    right: 5,
  },
  sendTextButton: {
    position: 'absolute',
    right: 0,
    bottom: 5,
  },
  textInput: {
    fontSize: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#9C11E6',
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingBottom: 5,
    paddingRight: 50,
    flex: 1,
  },
  textInputWrapper: {
    flexDirection: 'row',
  },
  profileImg: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'grey',
  },
})

export default commonStyles;