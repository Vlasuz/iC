import {
    IAllUserProjects,
    IEmployee,
    IExpense,
    INotification,
    IProject,
    IStatistic,
    ISummaryEmployee,
    ITask,
    ITimesheet,
    IUser
} from "../models";

export const initialState = () => {
    return {
        user: <IUser>{},
        accessToken: <string>"",
        refreshToken: <string>"",
        employees: <IEmployee[]>[],
        selectedEmployee: <IEmployee>{},
        language: <string>"",
        tasks: <ITask[]>[],
        expenses: <IExpense[]>[],
        timesheet: <ITimesheet[]>[],
        timesheetIdPerMonth: [],
        timesheetStatistic: <IStatistic[]>[],
        chosenTimesheet: <ITimesheet>{},
        summaryEmployees: <ISummaryEmployee[]>[],
        notifications: <INotification[]>[],
        allUserProjects: <IAllUserProjects>{},

        projects: <IProject[]>[],

        summaryEmployeeIdOpen: <string>{},
    }
}