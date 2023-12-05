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
        editEmployee(state, action) {
            state.employees = state.employees.filter(item => item.id !== action.payload.data.id)
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
        addProject(state, action) {
            state.projects = [...state.projects, action.payload]
        },
        editProject(state, action) {
            console.log(action.payload)
            state.projects = state.projects.filter(item => item.id !== action.payload.data.id)
            state.projects = [...state.projects, action.payload.newData]
        },
        removeProject(state, action) {
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
    editEmployee,
    removeEmployee,
    setSelectedEmployee,

    setProjects,
    addProject,
    editProject,
    removeProject,

} = toolkit.actions;