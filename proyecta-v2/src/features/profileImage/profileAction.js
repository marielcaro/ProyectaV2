import { createSlice } from '@reduxjs/toolkit'
import uploadIcon from "../../assets/icons/upload.png"

const initialState = {
  value: uploadIcon,
}



export const profileAction = createSlice({
    name: 'profile',
    initialState,
    reducers: {
      foto: (state, file) => {
          state.value = file
      },
      initial: (state) => {
        state.value = uploadIcon
      },
      
    },
  })


// Action creators are generated for each case reducer function
export const { foto, initial} = profileAction.actions

export default profileAction.reducer
