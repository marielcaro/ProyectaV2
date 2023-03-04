import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "Dashboard",
}

export const dashboardAction = createSlice({
    name: 'dashboardAction',
    initialState,
    reducers: {
      projects: (state) => {
          state.value ='Projects'
      },
      tasks: (state) => {
        state.value = 'Tasks'
      },
      calendar: (state) => {
        state.value = 'Calendar'
      },
        dashboard: (state) => {
        state.value = 'Dashboard'
      }
     
    },
  })


// Action creators are generated for each case reducer function
export const { projects, tasks, calendar, dashboard } = dashboardAction.actions

export default dashboardAction.reducer
