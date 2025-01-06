import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import pickImage from '../../util/PickImage'
import { UPDATE_PROFILE_PIC_LAMBDA_URL, CREATE_NEW_USER_LAMBDA_URL } from '../../util/Constants';
import commonStyles from '../../util/CommonStyles';
import { levelSignUpScreenIdentifier } from '../../util/Constants';

const AddPictureSignUpScreen = () => {
  const navigation = useNavigation();
  const [imageURL, setImageURL] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);


  const cognitoId = useSelector(state => state.user.cognitoId)
  const phoneNumber = useSelector(state => state.user.phoneNumber)
  const email = useSelector(state => state.user.email)
  const firstName = useSelector(state => state.user.firstName)
  const lastName = useSelector(state => state.user.lastName)
  const birthday = useSelector(state => state.user.birthday)
  const gender = useSelector(state => state.user.gender)
  const city = useSelector(state => state.user.city)
  const tennisLevel = useSelector(state => state.user.tennisLevel)
 

  const onPressArrow = async() => {
    setShowIndicator(true);
    try {
      await uploadImage();
      await createProfile();
      navigation.navigate('home');
    }
    catch (error) {
      alert("Castastrophic failure. You will now die.")
      console.log(error)
    }
    setShowIndicator(false);
  }

  const callPickImage = async() => {
    const pickedImage = await pickImage();
    const imageAsset = pickedImage.assets[0];
    const imageURI = imageAsset.uri;
    setImageURL(imageURI);
  }

  const uploadImage = async() => {

    const imageBlob = await getBlob(imageURL);

    const S3URL = await callUdateProfilePicLambdaAndGetS3URL();
    console.log(S3URL);
    
    await callS3PresignedUrlAndUploadImage(S3URL, imageBlob)
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
    if (response2.status != 200) {
      throw new Error("couldn't save profile pic to s3");
    }
    console.log(response2);
  }

  const createProfile = async() => {
    console.log("Calling createNewUser Lambda Function")
    console.log(cognitoId)
    console.log(phoneNumber)

    const body = JSON.stringify({
      cognitoId: cognitoId,
      phoneNumber: phoneNumber,
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      gender: gender,
      city: city,
      tennisLevel: tennisLevel
    })
    console.log(body);
    

    const response = await fetch(CREATE_NEW_USER_LAMBDA_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: body
    });

    if (response.status == 400) {
      throw new Error("400 error from server");
    }
    console.log("successfully called lambda")
  }

  return (
    <View
      style={styles.root}
    >
      <IconButton
        icon='arrow-left'
        iconColor={'#9C11E6'}
        size={40}
        style={commonStyles.leftArrowIcon}
        onPress={() => navigation.navigate(levelSignUpScreenIdentifier)}
        disabled={showIndicator ? true : false}
      />
      {imageURL == null || showIndicator ? 
        showIndicator ? 
            <ActivityIndicator
              style={styles.activityIndicator}
              size='large'
              color='#9C11E6'
            />
          :
            <IconButton
              icon='arrow-right'
              iconColor={'grey'}
              size={40}
              style={commonStyles.rightArrowIcon}
              disabled
            />
            :
            <IconButton
              icon='arrow-right'
              iconColor={'#9C11E6'}
              size={40}
              style={commonStyles.rightArrowIcon}
              onPress={() => onPressArrow()}
            />
      }      
      <Text
        style={styles.copy}
      >
        Add a photo!
      </Text>
      <View
        style={styles.firstRowView}
      >
        <TouchableOpacity
          onPress={() => callPickImage()}
          disabled={showIndicator ? true : false}
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
  activityIndicator: {
    position: 'absolute',
    top: 40,
    right: 20,
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
