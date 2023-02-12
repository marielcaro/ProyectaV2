import { configureStore } from '@reduxjs/toolkit'
import loginAction from './features/login/loginAction'
import dashboardAction from './features/dashboard/dashboardAction'

export default configureStore({
  reducer: {
    login: loginAction,
    dashboard: dashboardAction
  },
})

