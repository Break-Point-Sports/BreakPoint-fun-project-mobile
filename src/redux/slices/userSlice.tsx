import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    cognitoId: '',
    phoneNumber: '',
    name: '',
    birthday: '',
  },
  reducers: {
    updateCognitoId: (state, action) => {
      state.cognitoId = action.payload
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload
    },
    updateName: (state, action) => {
      state.name = action.payload
    },
    updateBirthday: (state, action) => {
      state.birthday = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {updateCognitoId, updatePhoneNumber, updateName, updateBirthday} = userSlice.actions

export default userSlice.reducer