import { createSlice } from '@reduxjs/toolkit'


export const loginAction = createSlice({
    name: 'login',
    initialState: {
      value: 'Initial',
    },
    reducers: {
      access: (state) => {
          state.value ='Access'
      },
      recover: (state) => {
        state.value = 'Recover'
      },
      create: (state) => {
        state.value = 'Create'
      },
        exit: (state) => {
        state.value = 'Exit'
      },
      init: (state) => {
        state.value = 'Initial'
      },
    },
  })


// Action creators are generated for each case reducer function
export const { access, create, recover, exit, init } = loginAction.actions

export default loginAction.reducer
