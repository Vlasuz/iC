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
            state.employees = [action.payload, ...state.employees]
        },
        editEmployee(state, action) {
            state.employees = state.employees.filter(item => item.id !== action.payload.data.id)
            state.employees = [action.payload.newDataEmployee, ...state.employees]
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
            state.projects = [action.payload, ...state.projects]
        },
        editProject(state, action) {
            state.projects = state.projects.filter(item => item.id !== action.payload.data.id)
            state.projects = [action.payload.newData, ...state.projects]
        },
        removeProject(state, action) {
            state.projects = state.projects.filter(item => item.id !== action.payload.id)
        },

        setLanguage(state, action) {
            state.language = action.payload
        },

        setTasks(state, action) {
            state.tasks = action.payload
        },
        addTask(state, action) {
            state.tasks = [...state.tasks, action.payload]
        },
        removeTask(state, action) {
            state.tasks = state.tasks.filter(item => item.id !== action.payload.id)
        },
        editTask(state, action) {
            console.log(action.payload)
            state.tasks = state.tasks.filter(item => item?.id !== action.payload.id)
            state.tasks = [action.payload, ...state.tasks]
        },

        setExpenses(state, action) {
            state.expenses = action.payload
        },
        addExpense(state, action) {
            state.expenses = [...state.expenses, action.payload]
        },
        removeExpense(state, action) {
            state.expenses = state.expenses.filter(item => item.id !== action.payload.id)
        },
        editExpense(state, action) {
            state.expenses = state.expenses.filter(item => item?.id !== action.payload.id)
            state.expenses = [action.payload, ...state.expenses]
        },

        setTimesheet(state, action) {
            state.timesheet = action.payload
        },
        setChosenTimesheet(state, action) {
            state.chosenTimesheet = action.payload
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

    setLanguage,

    setTasks,
    addTask,
    removeTask,
    editTask,

    setExpenses,
    addExpense,
    removeExpense,
    editExpense,

    setTimesheet,
    setChosenTimesheet

} = toolkit.actions;