import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import pickImage from '../../util/PickImage'


const UPDATE_PROFILE_PIC_LAMBDA_URL = "https://27ksr4utemgyckb4nxqb62wkcq0xnsfk.lambda-url.us-east-1.on.aws/";
const CREATE_NEW_USER_LAMBDA_URL = "https://b54tz6kjxddxjhn6d2aqbfvvfm0tcktv.lambda-url.us-east-1.on.aws/"

const AddPictureSignUpScreen = () => {
  const navigation = useNavigation();
  const [imageURL, setImageURL] = useState(null);


  const cognitoId = useSelector(state => state.user.cognitoId)
  const phoneNumber = useSelector(state => state.user.phoneNumber)
  const firstName = useSelector(state => state.user.firstName)
  const lastName = useSelector(state => state.user.lastName)
  const birthday = useSelector(state => state.user.birthday)
  const gender = useSelector(state => state.user.gender)
 

  const onPressArrow = async() => {
    // await createProfile();
    navigation.navigate('home');
  }

  const pickAndUploadImage = async() => {
    const pickedImage = await pickImage();
    const imageAsset = pickedImage.assets[0];
    const imageURI = imageAsset.uri;
    const imageBlob = await getBlob(imageURI);

    const S3URL = await callUdateProfilePicLambdaAndGetS3URL();
    console.log(S3URL);

    try {
      await callS3PresignedUrlAndUploadImage(S3URL, imageBlob)
      setImageURL(imageURI);
    } catch (error) {
      console.log(error);
      alert("Castastrophic failure. You will now die.")
    }
  }

  const callUdateProfilePicLambdaAndGetS3URL = async() => {
    const response = await fetch(UPDATE_PROFILE_PIC_LAMBDA_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        cognitoId: cognitoId,
      }),
    });
    const lambdaJson = await response.json();
    return lambdaJson.url;
  }

  const getBlob = async (fileUri) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };
  
  const callS3PresignedUrlAndUploadImage = async(S3URL, imageBlob) => {
    console.log("contacting S3")
    const response2 = await fetch(S3URL, {
      headers: {
        'Content-Type': 'image/jpeg'
      },
      method: 'PUT',
      body: imageBlob
    });
    console.log(response2);
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
          onPress={() => pickAndUploadImage()}
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
