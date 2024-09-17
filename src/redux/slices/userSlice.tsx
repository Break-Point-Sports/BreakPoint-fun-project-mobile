import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    cognitoId: '',
    phoneNumber: '',
  },
  reducers: {
    updateCognitoId: (state, action) => {
      state.cognitoId = action.payload
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const {updateCognitoId, updatePhoneNumber} = userSlice.actions

export default userSlice.reducer