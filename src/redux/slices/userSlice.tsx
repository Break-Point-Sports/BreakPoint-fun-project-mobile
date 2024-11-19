import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    cognitoId: '',
    phoneNumber: '',
    email: '',
    firstName: '',
    lastName: ''
,   birthday: '',
    gender: '',
    tennisLevel: '',
    city: '',
    currentLeague: 'none',
    pastLeagues: []
  },
  reducers: {
    updateCognitoId: (state, action) => {
      state.cognitoId = action.payload
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload
    },
    updateEmail: (state, action) => {
      state.email = action.payload
    },
    updateFirstName: (state, action) => {
      state.firstName = action.payload
    },
    updateLastName: (state, action) => {
      state.lastName = action.payload
    },
    updateBirthday: (state, action) => {
      state.birthday = action.payload
    },
    updateGender: (state, action) => {
      state.gender = action.payload
    },
    updateTennisLevel: (state, action) => {
      state.tennisLevel = action.payload
    },
    updateCity: (state, action) => {
      state.city = action.payload
    },
    updateCurrentLeague: (state, action) => {
      state.currentLeague = action.payload
    },
    updatePastLeagues: (state, action) => {
      state.pastLeagues = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {updateCognitoId, updatePhoneNumber, updateFirstName, 
  updateLastName, updateBirthday, updateGender, updateTennisLevel, 
  updateCity, updateCurrentLeague, updatePastLeagues, updateEmail} = userSlice.actions

export default userSlice.reducer