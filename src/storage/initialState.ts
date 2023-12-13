import {IEmployee, IExpense, IProject, ITask, ITimesheet, IUser} from "../models";

export const initialState = () => {
    return {
        user: <IUser>{},
        accessToken: <string>"",
        employees: <IEmployee[]>[],
        selectedEmployee: <IEmployee>{},
        language: <string>"",
        tasks: <ITask[]>[],
        expenses: <IExpense[]>[],
        timesheet: <ITimesheet[]>[],
        chosenTimesheet: <ITimesheet>{},

        projects: <IProject[]>[],
    }
}