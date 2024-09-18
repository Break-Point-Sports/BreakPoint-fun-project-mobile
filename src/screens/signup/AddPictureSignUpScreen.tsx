import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import pickImage from '../../util/PickImage';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ADD_PHOTO_LAMBDA_URL = "";
const CREATE_NEW_USER_LAMBDA_URL = ""

const AddPictureSignUpScreen = () => {
  const navigation = useNavigation();
  const [imageURL, setImageURL] = useState(null);


  const cognitoId = useSelector(state => state.user.cognitoId)
  const phoneNumber = useSelector(state => state.user.phoneNumber)
  const name = useSelector(state => state.user.name)
  const birthday = useSelector(state => state.user.birthday)
  const whereDoYouLive = useSelector(state => state.user.whereDoYouLive)
  const gender = useSelector(state => state.user.gender)



  const updateImage = async () => {    
    try {

      const imageData = await pickImage();
      const uri = imageData.assets[0].uri;
      
      // console.log('Calling Add Photo Lambda with cognitoId: ' + cognitoId)

      // const response = await fetch(ADD_PHOTO_LAMBDA_URL, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   method: 'POST',
      //   body: JSON.stringify({
      //     cognitoId: cognitoId,
      //     filename: photoNumber.toString() + '.jpg'
      //   }),
      // });
      // const lambdaJson = await response.json();

      // const S3Url = lambdaJson.url;
      // const fields = lambdaJson.fields;
      // const formData = new FormData();

      // for (var key in fields) {
      //     formData.append(key, fields[key]);
      // }
      // formData.append("file", {uri: uri, type: 'image/jpeg'})

      // console.log("contacting S3")
      // const response2 = await fetch(S3Url, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   method: 'POST',
      //   body: formData
      // });

      setImageURL(uri)
      console.log("done")
    } catch (error) {
      console.log(error);
    }
  }

  const onPressArrow = async() => {
    // await createProfile();
    navigation.navigate('home');
  }

  // const createProfile = async() => {
  //   console.log("Calling createNewUser Lambda Function")
  //   console.log(cognitoId)
  //   console.log(phoneNumber)

  //   try {
  //     const response = await fetch(CREATE_NEW_USER_LAMBDA_URL, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'POST',
  //       body: JSON.stringify({
  //         cognitoId: cognitoId,
  //         phoneNumber: phoneNumber,
  //         name: name,
  //         birthday: birthday,
  //         whereDoYouLive: whereDoYouLive,
  //         gender: gender,
  //       }),
  //     });

  //     console.log("successfully called lambda")
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <View
      style={styles.root}
    >
      <IconButton
        icon='arrow-right'
        color={'grey'}
        size={40}
        style={styles.arrowIcon}
        disabled={imageURL !== null ? false : true}
        onPress={() => onPressArrow()}
      />
      <Text
        style={styles.copy}
      >
        Add a photo so people will recognize you when it's time to play!
      </Text>
      <View
        style={styles.firstRowView}
      >
        <TouchableOpacity
          onPress={() => updateImage()}
        >
          <Image
            style={styles.mainImg}
            source={{uri: imageURL}}
          />
        </TouchableOpacity>
      </View>


    </View>
  )
}


const styles = StyleSheet.create({
  arrowIcon: {
    position: 'absolute',
    top: 20,
    right: 5,
  },
  copy: {
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 100
  },
  firstRowView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fifthImg: {
    alignSelf: 'center',
    width: 100,
    height: 150,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 5,
    backgroundColor: 'grey',
  },
  fourthImg: {
    alignSelf: 'center',
    width: 100,
    height: 150,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: 'grey',
  },
  mainImg: {
    alignSelf: 'center',
    width: 200,
    height: 300,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: 'grey',
  },
  secondImg: {
    alignSelf: 'center',
    width: 100,
    height: 150,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: 'grey',
    marginLeft: 10,
  },
  secondRowView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sixthImg: {
    alignSelf: 'center',
    width: 100,
    height: 150,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 5,
    backgroundColor: 'grey',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
})

export default AddPictureSignUpScreen;
