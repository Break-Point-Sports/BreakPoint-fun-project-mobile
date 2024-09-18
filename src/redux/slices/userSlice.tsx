import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    cognitoId: '',
    phoneNumber: '',
    firstName: '',
    lastName: ''
,   birthday: '',
    gender: '',
  },
  reducers: {
    updateCognitoId: (state, action) => {
      state.cognitoId = action.payload
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload
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
  }
})

// Action creators are generated for each case reducer function
export const {updateCognitoId, updatePhoneNumber, updateFirstName, updateLastName, updateBirthday, updateGender} = userSlice.actions

export default userSlice.reducer