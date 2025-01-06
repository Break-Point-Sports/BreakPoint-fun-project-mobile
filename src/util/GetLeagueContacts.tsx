import { GET_LEAGUE_MEMBERS_LAMBDA_URL } from '../util/Constants';


const getLeagueContacts = async (currentLeague) => {
  const URI = GET_LEAGUE_MEMBERS_LAMBDA_URL + `?league=${currentLeague}&whichLeague=currentLeague`
  console.log("Fetching " + URI);
  const response = await fetch(URI, {method: "GET"});
  const body = await response.json();
  console.log("league contacts response: ")
  console.log(body)
  return body
}

export default getLeagueContacts