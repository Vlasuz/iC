import {createSlice} from "@reduxjs/toolkit";
import {initialState} from "./initialState";


const toolkit = createSlice({
    name: "toolkit",
    initialState: initialState(),
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setAccessToken(state, action) {
            state.accessToken = action.payload
        },
        setEmployeesList(state, action) {
            state.employees = action.payload
        },
        addEmployee(state, action) {
            state.employees = [...state.employees, action.payload]
        },
        changeEmployee(state, action) {
            state.employees = state.employees.filter(item => item.id !== action.payload.selectedEmployee.id)
            state.employees = [...state.employees, action.payload.newDataEmployee]
        },
        removeEmployee(state, action) {
            console.log(action.payload)
            state.employees = state.employees.filter(item => item.id !== action.payload.id)
        },
        setSelectedEmployee(state, action) {
            state.selectedEmployee = action.payload
        },

        setProjects(state, action) {
            state.projects = action.payload
        },
        addProjects(state, action) {
            state.projects = [...state.projects, action.payload]
        },
        editProjects(state, action) {
            state.projects = action.payload
        },
        removeProjects(state, action) {
            state.projects = state.projects.filter(item => item.id !== action.payload.id)
        },
    },
})

export default toolkit.reducer;
export const {

    setUser,
    setAccessToken,

    setEmployeesList,
    addEmployee,
    changeEmployee,
    removeEmployee,
    setSelectedEmployee,

    setProjects,
    addProjects,
    editProjects,
    removeProjects,

} = toolkit.actions;