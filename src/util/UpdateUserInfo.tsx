import { updateFirstName, updateLastName, updateGender, updateTennisLevel, 
  updateCurrentLadder, updateBirthday, updateCity, updatePastLeagues, updateCurrentLeague,
  updateFutureLeague, updateEmail
  } from '../redux/slices/userSlice';
import {GET_USER_DETAILS_LAMBDA_URL} from '../util/Constants';

export const updateUserInfo = async(cognitoId, dispatch) => {
  const URI = GET_USER_DETAILS_LAMBDA_URL + '?cognitoId='+ cognitoId;
  console.log("Fetching user details" + URI);
  const response = await fetch(URI, {method: 'GET'});
  
  const body = await response.json();
  console.log(body);

  dispatch(updateFirstName(body.firstName));
  dispatch(updateLastName(body.lastName));
  dispatch(updateEmail(body.email))
  dispatch(updateBirthday(body.birthday));
  dispatch(updateGender(body.gender));
  dispatch(updateTennisLevel(body.tennisLevel));
  dispatch(updateCurrentLeague(body.currentLeague));
  dispatch(updatePastLeagues(body.pastLeagues));
  dispatch(updateCity(body.city));
  dispatch(updateTennisLevel(body.tennisLevel));
  dispatch(updateFutureLeague(body.futureLeague));
  dispatch(updateCurrentLadder(body.currentLadder));
}