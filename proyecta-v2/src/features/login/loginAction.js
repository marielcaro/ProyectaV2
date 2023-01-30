import { createSlice } from '@reduxjs/toolkit'

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState: {
//     value: 0,
//   },
//   reducers: {
//     increment: (state) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload
//     },
//   },
// })

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
// export default counterSlice.reducer