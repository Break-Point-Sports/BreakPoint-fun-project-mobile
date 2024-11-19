import RBSheet from 'react-native-raw-bottom-sheet';
import { Dimensions, StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { TextInput, IconButton, PaperProvider, Button, Portal, Modal } from 'react-native-paper';
// import Slider from '@react-native-community/slider';



const NewMessageDrawer = ({ newMessageRef }) => {
  const phoneNumber = useSelector(state => state.user.phoneNumber)

  const navigation = useNavigation(); 

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <RBSheet
        ref={newMessageRef}
        closeOnPressMask={false}
        height={Dimensions.get('window').height}
        customStyles={{
        wrapper: {
            backgroundColor: "transparent"
        },
        draggableIcon: {
            backgroundColor: "#000"
        }
    }}
  >
    <PaperProvider>
        <Portal>
            <View
                style={styles.drawerHeader}
            >
      
                <IconButton
                icon='close'
                iconColor='#9C11E6'
                size={30}
                onPress={() => newMessageRef.current.close()}
                style={styles.closeButton}
                />
            </View>
            <View
                style={styles.mainView}
            >
                <TouchableOpacity
                    onPress={() => showModal()}
                    style={styles.toTouchableOpacity}
                >
                    <Text
                        style={styles.toText}
                    >
                        To:
                    </Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.messagingTextInput}
                />
            </View>

            <Modal 
                visible={visible} 
                onDismiss={hideModal} 
                contentContainerStyle={styles.modalContainer}
            >
                <ScrollView
                    style={styles.modalScrollView}
                >
                    <Text>
                        Alecio M.
                    </Text>
                </ScrollView>

            </Modal>
        </Portal>
    </PaperProvider>
  </RBSheet>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 1,
    textAlign: 'left',
    padding: 0,
    alignItems: 'flex-start'
  },
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
  label: {
    color: '#9C11E6'
  },
  mainView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  messagingTextInput: {
    height: 50,
    width: '100%',
    alignSelf: 'flex-end'
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 300,
    width: 250,
    alignSelf: 'center',
    position: 'absolute',
    top: 50
  },
  modalScrollView: {
    height: 100,
    width: 100
  },
  toText: {
    fontSize: 30,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 400
  },
  toTouchableOpacity: {
    
  }
})

export default NewMessageDrawer;