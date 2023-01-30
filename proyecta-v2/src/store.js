import { configureStore } from '@reduxjs/toolkit'
import loginAction from './features/login/loginAction'

export default configureStore({
  reducer: {
    login: loginAction
  },
})

